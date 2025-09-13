import React from 'react';

const TermsOfService = () => {
  return (
    <div className="pt-24">
      {/* Header Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">Terms of Service</h1>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">Last Updated: August 27, 2025</p>

            <p className="mb-8 leading-relaxed text-gray-700">
              Welcome to Project Party Productions ("Company," "we," "us," "our"). These Terms of Service ("Terms") govern the use of our website, booking services, and the rental and operation of our photo booths, 360 video booths, and related services (collectively, the "Services"). By accessing our website, booking our Services, or attending an event where our Services are provided, you ("Client," "you," "your," "user," or "guests") agree to be bound by these Terms.
            </p>

            <p className="mb-8 font-semibold text-gray-800">
              If you do not agree to these Terms, please do not use our Services.
            </p>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Services Provided</h2>
            <div className="mb-8">
              <p className="mb-2"><strong>1.1</strong> Project Party Productions provides rental of photo booths, 360 video booths, lighting equipment, props, backdrops, and related event services.</p>
              <p className="mb-2"><strong>1.2</strong> Services may include delivery, setup, operation, on-site staff, takedown, and optional add-ons (custom overlays, props, prints, digital sharing, etc.).</p>
              <p className="mb-2"><strong>1.3</strong> We reserve the right to update, modify, or discontinue Services at any time without liability, provided that confirmed bookings will be honored or refunded.</p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Booking & Payments</h2>
            <div className="mb-8">
              <p className="mb-2"><strong>2.1</strong> A signed booking agreement or digital acceptance along with a deposit is required to secure your event date.</p>
              <p className="mb-2"><strong>2.2</strong> Deposits are [non-refundable / refundable under specific conditions — insert your policy].</p>
              <p className="mb-2"><strong>2.3</strong> Full payment is due [X days] prior to the event, unless otherwise agreed in writing.</p>
              <p className="mb-2"><strong>2.4</strong> Accepted payment methods include [list: credit card, e-transfer, PayPal, etc.].</p>
              <p className="mb-2"><strong>2.5</strong> Late payments may incur fees of [X%] per day or event cancellation.</p>
              <p className="mb-2"><strong>2.6</strong> Any additional hours, damages, or overages incurred during the event will be invoiced after the event and are due within [X days].</p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Cancellations & Rescheduling</h2>
            <div className="mb-8">
              <p className="mb-2"><strong>3.1</strong> Client cancellations made [X days] or more prior to the event may be eligible for rescheduling subject to availability.</p>
              <p className="mb-2"><strong>3.2</strong> Cancellations within [X days] of the event are non-refundable.</p>
              <p className="mb-2"><strong>3.3</strong> If we must cancel due to circumstances beyond our control (equipment failure, illness, accident, weather, force majeure), liability is limited to a full refund of monies paid.</p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Client Responsibilities</h2>
            <div className="mb-8">
              <p className="mb-2"><strong>4.1</strong> Client is responsible for providing a suitable event space, including access to electricity (minimum [insert specs]) and sufficient space ([insert space requirements]).</p>
              <p className="mb-2"><strong>4.2</strong> Client must ensure safe working conditions, including indoor/outdoor cover if applicable, flat ground, and protection from weather hazards.</p>
              <p className="mb-2"><strong>4.3</strong> Client is responsible for securing necessary venue permissions and complying with venue rules.</p>
              <p className="mb-2"><strong>4.4</strong> Client is responsible for the conduct of all event guests using the booth.</p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Equipment & Damages</h2>
            <div className="mb-8">
              <p className="mb-2"><strong>5.1</strong> Client shall be liable for any damage to our equipment caused by misuse, negligence, spills, rough handling, or guest misconduct.</p>
              <p className="mb-2"><strong>5.2</strong> If equipment is damaged or stolen during the event, the Client agrees to reimburse replacement or repair costs.</p>
              <p className="mb-2"><strong>5.3</strong> Equipment malfunctions not caused by Client negligence will not incur extra charges and may result in a partial refund at our discretion.</p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Guest Conduct</h2>
            <div className="mb-8">
              <p className="mb-2"><strong>6.1</strong> The Company reserves the right to refuse or stop Services if guests are abusive, violent, intoxicated, destructive, or unsafe.</p>
              <p className="mb-2"><strong>6.2</strong> Props, backdrops, and equipment must not be removed from the designated area.</p>
              <p className="mb-2"><strong>6.3</strong> Offensive, illegal, or harmful content is prohibited in the use of our Services.</p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Intellectual Property & Media Usage</h2>
            <div className="mb-8">
              <p className="mb-2"><strong>7.1</strong> By using our Services, you grant us the right to capture, store, and share images and videos created in the booth.</p>
              <p className="mb-2"><strong>7.2</strong> Project Party Productions retains ownership of all media generated unless otherwise agreed in writing.</p>
              <p className="mb-2"><strong>7.3</strong> Clients and guests may receive copies of media for personal use. Commercial use requires prior written consent.</p>
              <p className="mb-2"><strong>7.4</strong> We may use images and videos for marketing, promotional, or portfolio purposes unless the Client provides a written objection prior to the event.</p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Privacy & Data</h2>
            <div className="mb-8">
              <p className="mb-2"><strong>8.1</strong> Guest data (names, emails, phone numbers) collected through digital sharing features is subject to our Privacy Policy.</p>
              <p className="mb-2"><strong>8.2</strong> We will not sell or misuse guest data, but may use it for operational, technical, or marketing purposes with consent.</p>
              <p className="mb-2"><strong>8.3</strong> Clients are responsible for ensuring guests are aware media may be shared digitally or publicly.</p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Limitation of Liability</h2>
            <div className="mb-8">
              <p className="mb-4"><strong>9.1</strong> To the fullest extent permitted by law, Project Party Productions shall not be liable for:</p>
              <ul className="list-disc ml-8 mb-4">
                <li>Indirect, incidental, special, or consequential damages.</li>
                <li>Any lost profits, lost opportunities, or reputational damage.</li>
                <li>Interruptions caused by venue issues, guest interference, weather, power failures, or internet outages.</li>
              </ul>
              <p className="mb-2"><strong>9.2</strong> Our liability for any claim is limited to the total fees paid for the event.</p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Indemnification</h2>
            <div className="mb-8">
              <p className="mb-4">Client agrees to indemnify and hold harmless Project Party Productions, its owners, employees, and contractors from any claims, damages, injuries, legal actions, or expenses arising from:</p>
              <ul className="list-disc ml-8">
                <li>Guest misuse of equipment.</li>
                <li>Property damage or personal injury.</li>
                <li>Breach of venue rules.</li>
                <li>Use of event media by guests.</li>
              </ul>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Force Majeure</h2>
            <div className="mb-8">
              <p className="mb-2">Neither party shall be held liable for delays or failures due to events beyond reasonable control, including natural disasters, government actions, strikes, pandemics, or technical failures.</p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Termination of Services</h2>
            <div className="mb-8">
              <p className="mb-4">We reserve the right to terminate Services immediately, without refund, if:</p>
              <ul className="list-disc ml-8">
                <li>Guests engage in illegal, dangerous, or abusive conduct.</li>
                <li>Client fails to meet payment obligations.</li>
                <li>Venue conditions are unsafe.</li>
              </ul>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Governing Law & Dispute Resolution</h2>
            <div className="mb-8">
              <p className="mb-2"><strong>13.1</strong> These Terms shall be governed by the laws of [Province of Ontario, Canada].</p>
              <p className="mb-2"><strong>13.2</strong> Any disputes shall be resolved in the courts of [Toronto, Ontario].</p>
              <p className="mb-2"><strong>13.3</strong> Parties agree to attempt mediation or arbitration before pursuing litigation.</p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">14. Miscellaneous</h2>
            <div className="mb-8">
              <p className="mb-2"><strong>14.1</strong> These Terms, along with any signed booking agreement, constitute the entire agreement.</p>
              <p className="mb-2"><strong>14.2</strong> If any provision is found unenforceable, the remainder shall still apply.</p>
              <p className="mb-2"><strong>14.3</strong> No waiver of rights shall be deemed ongoing unless in writing.</p>
              <p className="mb-2"><strong>14.4</strong> We may update these Terms at any time. Continued use of Services constitutes acceptance of changes.</p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
            <div className="mb-8">
              <p className="mb-4">If you have questions about these Terms, please contact us at:</p>
              <p className="mb-2"><strong>Project Party Productions</strong></p>
              <p className="mb-2"><strong>Email:</strong> info@projectpartyproductions.com</p>
              <p className="mb-2"><strong>Phone:</strong> 647-957-2057</p>
              <p className="mb-2"><strong>Address:</strong> Toronto, Ontario, Canada</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
