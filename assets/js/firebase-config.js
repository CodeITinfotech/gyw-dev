// Firebase Configuration
// Replace with your Firebase project credentials
const firebaseConfig = {
    apiKey: "AIzaSyDEMO-Replace-With-Your-Key",
    authDomain: "goayachtworld-demo.firebaseapp.com",
    databaseURL: "https://goayachtworld-demo-default-rtdb.firebaseio.com",
    projectId: "goayachtworld-demo",
    storageBucket: "goayachtworld-demo.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123def456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Firebase Service - Handles all data operations
class FirebaseService {
    constructor() {
        this.refs = {
            categories: database.ref('categories'),
            extras: database.ref('extras'),
            yachts: database.ref('yachts'),
            reviews: database.ref('reviews'),
            questions: database.ref('questions'),
            settings: database.ref('settings')
        };
        
        // Initialize with defaults if empty
        this.initDefaults();
    }

    // Initialize default data if Firebase is empty
    async initDefaults() {
        try {
            const snapshot = await this.refs.yachts.once('value');
            if (!snapshot.exists()) {
                // Seed initial data
                await this.refs.categories.set(DEFAULT_CATEGORIES_JS);
                await this.refs.extras.set(DEFAULT_EXTRAS.map(e => ({ ...e, active: true })));
                await this.refs.yachts.set(DEFAULT_YACHTS);
                await this.refs.reviews.set(DEFAULT_REVIEWS.map(r => ({ ...r, active: true })));
                await this.refs.questions.set(DEFAULT_QUESTIONS);
                console.log('Firebase initialized with default data');
            }
        } catch (error) {
            console.error('Error initializing Firebase:', error);
        }
    }

    // ============ CATEGORIES ============
    async getCategories() {
        try {
            const snapshot = await this.refs.categories.once('value');
            const data = snapshot.val();
            return data ? Object.values(data).filter(c => c.active !== false) : [];
        } catch (error) {
            console.error('Error getting categories:', error);
            return DEFAULT_CATEGORIES_JS;
        }
    }

    async saveCategories(categories) {
        try {
            await this.refs.categories.set(categories);
            return true;
        } catch (error) {
            console.error('Error saving categories:', error);
            return false;
        }
    }

    onCategoriesChange(callback) {
        this.refs.categories.on('value', snapshot => {
            const data = snapshot.val();
            callback(data ? Object.values(data).filter(c => c.active !== false) : []);
        });
    }

    // ============ EXTRAS ============
    async getExtras() {
        try {
            const snapshot = await this.refs.extras.once('value');
            const data = snapshot.val();
            return data ? Object.values(data).filter(e => e.active !== false) : [];
        } catch (error) {
            console.error('Error getting extras:', error);
            return [];
        }
    }

    async saveExtras(extras) {
        try {
            await this.refs.extras.set(extras);
            return true;
        } catch (error) {
            console.error('Error saving extras:', error);
            return false;
        }
    }

    onExtrasChange(callback) {
        this.refs.extras.on('value', snapshot => {
            const data = snapshot.val();
            callback(data ? Object.values(data).filter(e => e.active !== false) : []);
        });
    }

    // ============ YACHTS ============
    async getYachts() {
        try {
            const snapshot = await this.refs.yachts.once('value');
            const data = snapshot.val();
            return data ? Object.values(data).filter(y => y.disabled !== true) : [];
        } catch (error) {
            console.error('Error getting yachts:', error);
            return DEFAULT_YACHTS;
        }
    }

    async saveYachts(yachts) {
        try {
            await this.refs.yachts.set(yachts);
            return true;
        } catch (error) {
            console.error('Error saving yachts:', error);
            return false;
        }
    }

    onYachtsChange(callback) {
        this.refs.yachts.on('value', snapshot => {
            const data = snapshot.val();
            callback(data ? Object.values(data).filter(y => y.disabled !== true) : []);
        });
    }

    // ============ REVIEWS ============
    async getReviews() {
        try {
            const snapshot = await this.refs.reviews.once('value');
            const data = snapshot.val();
            return data ? Object.values(data).filter(r => r.active !== false) : [];
        } catch (error) {
            console.error('Error getting reviews:', error);
            return DEFAULT_REVIEWS;
        }
    }

    async saveReviews(reviews) {
        try {
            await this.refs.reviews.set(reviews);
            return true;
        } catch (error) {
            console.error('Error saving reviews:', error);
            return false;
        }
    }

    onReviewsChange(callback) {
        this.refs.reviews.on('value', snapshot => {
            const data = snapshot.val();
            callback(data ? Object.values(data).filter(r => r.active !== false) : []);
        });
    }

    // ============ QUESTIONS ============
    async getQuestions() {
        try {
            const snapshot = await this.refs.questions.once('value');
            const data = snapshot.val();
            return data ? Object.values(data) : [];
        } catch (error) {
            console.error('Error getting questions:', error);
            return DEFAULT_QUESTIONS;
        }
    }

    async saveQuestions(questions) {
        try {
            await this.refs.questions.set(questions);
            return true;
        } catch (error) {
            console.error('Error saving questions:', error);
            return false;
        }
    }

    onQuestionsChange(callback) {
        this.refs.questions.on('value', snapshot => {
            const data = snapshot.val();
            callback(data ? Object.values(data) : []);
        });
    }

    // ============ CONTACT SUBMISSIONS ============
    async saveContactSubmission(submission) {
        try {
            const contactsRef = database.ref('contacts').push();
            await contactsRef.set({
                ...submission,
                date: new Date().toISOString()
            });
            return true;
        } catch (error) {
            console.error('Error saving contact:', error);
            return false;
        }
    }

    async getContacts() {
        try {
            const snapshot = await this.refs.contacts.once('value');
            const data = snapshot.val();
            if (!data) return [];
            return Object.entries(data).map(([id, value]) => ({ id, ...value }));
        } catch (error) {
            console.error('Error getting contacts:', error);
            return [];
        }
    }

    onContactsChange(callback) {
        database.ref('contacts').on('value', snapshot => {
            const data = snapshot.val();
            if (!data) {
                callback([]);
                return;
            }
            const contacts = Object.entries(data).map(([id, value]) => ({ id, ...value }));
            callback(contacts);
        });
    }
}

// Initialize Firebase Service
const firebaseService = new FirebaseService();
