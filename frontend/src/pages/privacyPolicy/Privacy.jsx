import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy max-w-5xl mx-auto px-6 py-12">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Privacy Policy
      </h1>

      <p className="text-gray-600 text-lg text-center mb-12">
        Your privacy is important to us. This Privacy Policy explains how{" "}
        <span className="text-red-500 font-semibold">FoodieHub</span> collects,
        uses, and protects your personal information when you use our services.
      </p>

      <div className="space-y-8">
        {/* Information We Collect */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            📌 Information We Collect
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Name, email address, phone number, and delivery address</li>
            <li>Payment details for order processing (secured)</li>
            <li>Order history and preferences</li>
            <li>Device and usage information (cookies, IP address, etc.)</li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            📌 How We Use Your Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
            <li>Process and deliver your orders</li>
            <li>Provide customer support and resolve issues</li>
            <li>Improve our website, services, and user experience</li>
            <li>Send updates, offers, and promotions (only if you agree)</li>
          </ul>
        </section>

        {/* How We Protect Your Data */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🔒 How We Protect Your Data
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We use secure servers, encryption, and strict access controls to
            safeguard your personal information. Payment data is processed
            through trusted third-party providers and is never stored directly
            on our servers.
          </p>
        </section>

        {/* Sharing of Information */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🤝 Sharing of Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We do not sell, rent, or trade your personal information. We only
            share data with trusted partners (e.g., payment gateways, delivery
            services) as required to fulfill your orders and improve our
            services.
          </p>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            ✅ Your Rights
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Access, update, or delete your personal information</li>
            <li>Opt-out of marketing communications anytime</li>
            <li>Request details about how your data is used</li>
          </ul>
        </section>

        {/* Updates to Policy */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            📅 Updates to This Policy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with the updated date.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            📞 Contact Us
          </h2>
          <p className="text-gray-600 leading-relaxed">
            If you have questions about our Privacy Policy, please contact us at{" "}
            <span className="font-medium text-red-500">support@petpujo.vercel.app</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
