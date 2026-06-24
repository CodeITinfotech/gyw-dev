/* ==========================================
   POLICY LOADER - Load policies from localStorage
   ========================================== */

// Default policies content
const DEFAULT_POLICIES = {
    privacy: `<p>Welcome to Goa Yacht World! This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website, https://goayachtworld.com (the "Site"). By using our services, you agree to the terms outlined in this policy.</p>

<h2>Information We Collect</h2>
<p>We may collect various types of information for the purpose of providing and improving our services:</p>
<ul>
<li><strong>Personal Information:</strong> When you make a booking or interact with our site, we may collect personal information such as your name, contact details, and payment information.</li>
<li><strong>Usage Data:</strong> We gather information about how you navigate and interact with our website. This includes IP addresses, browser details, and pages visited.</li>
</ul>

<h2>How We Use Your Information</h2>
<p>We use the collected information for:</p>
<ul>
<li><strong>Service Provision:</strong> To process bookings, respond to inquiries, and provide customer support.</li>
<li><strong>Improvement of Services:</strong> Analyzing usage data helps us enhance and tailor our services to better meet your needs.</li>
<li><strong>Communication:</strong> Keeping you informed about promotions, updates, and relevant information if you have opted to receive such communications.</li>
</ul>

<h2>Data Security</h2>
<p>We prioritize the security of your data. While we take reasonable measures to protect your information, please be aware that no online transmission or storage method can guarantee absolute security.</p>

<h2>Disclosure of Information</h2>
<p>We may share your personal information in the following circumstances:</p>
<ul>
<li><strong>Legal Compliance:</strong> If required by law or in response to valid legal processes.</li>
<li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in delivering our services.</li>
</ul>

<h2>Your Choices and Rights</h2>
<p>You have the right to access, correct, or delete your personal information. You can manage your communication preferences by contacting us.</p>

<h2>Cookies and Tracking Technologies</h2>
<p>Our website may use cookies and similar technologies to enhance your experience. You can adjust your browser settings to refuse cookies, but this may impact your ability to access certain features.</p>

<h2>Third-Party Links</h2>
<p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.</p>

<h2>Changes to this Privacy Policy</h2>
<p>We reserve the right to update our Privacy Policy. Any changes will be effective upon posting the updated policy on the website. We encourage you to review this page periodically.</p>

<h2>Children's Privacy</h2>
<p>Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.</p>

<h2>Contact Us</h2>
<p>If you have any questions or concerns about our Privacy Policy, please contact us:</p>
<div class="contact-box">
<p><strong>Goa Yacht World</strong></p>
<p>R-2, 4th Floor, Satt Adhar Champers<br>Panaji, Goa - 403001</p>
<p><strong>Phone:</strong> +91 8446275985 | +91 8446205985</p>
<p><strong>Email:</strong> support@goayachtworld.com</p>
</div>`,

    cancellation: `<p>Should you wish to cancel your booking, we would appreciate if you could inform us <strong>Ten days in advance</strong> to avail of Total Refund of your deposit.</p>

<p>If the government of Goa declares a warning sign to sail due to heavy incessant rain we stop operations and in that case we either ask you to reschedule the ride or return the advance payment.</p>

<p>Also if it's raining heavily we will ask you to reschedule the ride so that you can have a good experience.</p>

<p>You will also be refunded your whole deposit if your ride is cancelled from our side due to <strong>Technical reasons</strong>.</p>

<div class="contact-box">
<p><strong>Important Notes:</strong></p>
<ul>
<li>Kindly carry the Aadhar card of at least 1 person, preferably the 1 in whose name the ride is booked.</li>
<li>Water, Soft Drinks, Soda, Ice, chips and namkeen are Complementary.</li>
<li>Please reach the Jetty 15 minutes prior to the ride in order to move on time.</li>
</ul>
</div>`,

    refund: `<h3>Cancellation by Customer</h3>
<ul>
<li>To qualify for a <strong>Total Refund</strong> of your deposit, kindly notify us at least <strong>Ten days in advance</strong> of your scheduled booking date.</li>
<li>Refunds will not be processed for cancellations made within less than Ten days of the booking date.</li>
</ul>

<h3>Weather-Related Cancellations</h3>
<p>In the event of a government-issued warning sign preventing sailing due to heavy incessant rain in Goa, Goa Yacht World reserves the right to:</p>
<ol>
<li>Offer the option to reschedule the ride.</li>
<li>Provide a full refund of the advance payment.</li>
</ol>

<h3>Rainy Weather Policy</h3>
<p>In cases of heavy rainfall during the scheduled ride:</p>
<ol>
<li>Goa Yacht World may suggest rescheduling the ride for a better experience.</li>
<li>No additional charges will be applied for rescheduling due to adverse weather conditions.</li>
</ol>

<h3>Technical Cancellations</h3>
<p>If Goa Yacht World cancels a ride due to technical reasons, customers will be entitled to a full refund of their deposit.</p>

<div class="contact-box">
<p><strong>Note:</strong> Refunds will be processed using the same payment method used for the booking. Please allow a reasonable processing time for the refund to reflect in your account. Goa Yacht World reserves the right to modify this refund policy with or without notice.</p>
</div>`
};

// Policy Manager Class
class PolicyManager {
    constructor() {
        this.policiesKey = 'website_policies';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.policiesKey)) {
            this.seedPolicies();
        }
        this.loadPolicies();
    }

    seedPolicies() {
        localStorage.setItem(this.policiesKey, JSON.stringify(DEFAULT_POLICIES));
    }

    getPolicies() {
        const data = localStorage.getItem(this.policiesKey);
        return data ? JSON.parse(data) : DEFAULT_POLICIES;
    }

    getPolicy(type) {
        const policies = this.getPolicies();
        return policies[type] || DEFAULT_POLICIES[type] || '';
    }

    savePolicy(type, content) {
        const policies = this.getPolicies();
        policies[type] = content;
        localStorage.setItem(this.policiesKey, JSON.stringify(policies));
    }

    loadPolicies() {
        const privacyContent = document.getElementById('privacyContent');
        if (privacyContent) {
            const policyDiv = privacyContent.querySelector('.policy-content');
            if (policyDiv) policyDiv.innerHTML = this.getPolicy('privacy');
        }

        const cancellationContent = document.getElementById('cancellationContent');
        if (cancellationContent) {
            const policyDiv = cancellationContent.querySelector('.policy-content');
            if (policyDiv) policyDiv.innerHTML = this.getPolicy('cancellation');
        }

        const refundContent = document.getElementById('refundContent');
        if (refundContent) {
            const policyDiv = refundContent.querySelector('.policy-content');
            if (policyDiv) policyDiv.innerHTML = this.getPolicy('refund');
        }
    }
}

const policyManager = new PolicyManager();
