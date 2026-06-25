"use client";

import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { getFAQs } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const faqs = getFAQs();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header - Center Aligned */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <MessageCircleQuestion className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about yacht rentals in Goa
            </p>
          </div>

          {/* FAQ Items - Expandable */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "border border-gray-200 rounded-xl overflow-hidden transition-all duration-300",
                  openIndex === index 
                    ? "bg-white shadow-md border-primary/30" 
                    : "bg-gray-50 hover:bg-gray-100"
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className={cn(
                    "font-semibold pr-4 text-left transition-colors",
                    openIndex === index ? "text-primary" : "text-gray-900"
                  )}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 shrink-0 transition-all duration-300",
                      openIndex === index 
                        ? "text-primary rotate-180" 
                        : "text-gray-400"
                    )}
                  />
                </button>
                
                {/* Expandable Answer */}
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-400 ease-out",
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-5 pb-5 pt-0">
                    <div className={cn(
                      "border-t border-gray-100 pt-4",
                      openIndex === index ? "block" : "hidden"
                    )}>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a
              href="https://wa.me/918446275985?text=Hi%2C%20I%20have%20a%20question%20about%20yacht%20rental"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
