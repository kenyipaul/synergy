import Footer from "../layout/Footer"
import { motion } from "framer-motion"

export default function PrivacyPage() {
    return (
        <motion.div className="privacy-page"
            initial={{
                scale: 0,
                opacity: 0
            }}
            animate={{
                scale: 1,
                opacity: 1
            }}
            transition={{
                duration: 1
            }}
        >
            <div className="content">

                <h1>Synergy - Privacy Policy</h1>
                <p>This Privacy Policy explains how Synergy ("we," "us," or "our") collects, uses, and shares your personal information when you use the Synergy website and platform (the "Platform").</p>

                <div className="container">      
                    <h2>1. Information We Collect</h2>
                    <p>We may collect the following types of information:</p>
                    <ul>
                        <li><strong>Information you provide directly:</strong> This includes information you provide when you create an account, such as your name, email address, username, and profile picture. It also includes information you post in communities or provide when participating in events.</li>
                        <li><strong>Information we collect automatically:</strong> This includes information about your use of the Platform, such as your IP address, device type, browser type, operating system, and usage data. We may use cookies and similar technologies to collect this information.</li>
                        <li><strong>Information from third parties:</strong> We may receive information about you from third-party services that you connect to the Platform.</li>
                    </ul>
                </div>

                <div className="container">

                <h2>2. How We Use Your Information</h2>
                    <p>We may use your information for the following purposes:</p>
                    <ul>
                        <li>To provide and maintain the Platform;</li>
                        <li>To personalize your experience on the Platform;</li>
                        <li>To communicate with you, such as sending you updates, notifications, and marketing materials (you can opt out of marketing communications);</li>
                        <li>To facilitate events and community interactions;</li>
                        <li>To improve the Platform;</li>
                        <li>To comply with legal obligations.</li>
                    </ul>
                </div>

                <div className="container">      
                    <h2>3. How We Share Your Information</h2>
                    <p>We may share your information with:</p>
                    <ul>
                        <li><strong>Other users:</strong> Information you post in public areas of the Platform may be visible to other users.</li>
                        <li><strong>Service providers:</strong> We may share your information with third-party service providers who assist us with providing the Platform (e.g., hosting, analytics, customer support).</li>
                        <li><strong>Legal authorities:</strong> We may disclose your information to legal authorities if required by law or legal process.</li>
                    </ul>
                </div>

                <div className="container">
                    <h2>4. Your Choices</h2>
                    <p>You may have the following choices regarding your information:</p>
                    <ul>
                        <li><strong>Access and update:</strong> You can access and update your account information through the Platform settings.</li>
                        <li><strong>Opt-out of marketing communications:</strong> You can opt out of receiving marketing emails by following the instructions in the emails.</li>
                        <li><strong>Cookies:</strong> You can manage your cookie preferences through your browser settings.</li>
                    </ul>
                </div>

                <div className="container">
                    <h2>5. Security</h2>
                    <p>We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or electronic storage is completely secure.</p>
                </div>

                <div className="container">
                    <h2>6. Children's Privacy</h2>
                    <p>Our Platform is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child under 13 has provided us with personal information, please contact us.</p>
                </div>

                <div className="container">
                    <h2>7. Changes to This Privacy Policy</h2>
                    <p>We may update this Privacy Policy from time to time. We will post any changes on the Platform, and your continued use of the Platform after such changes constitutes your acceptance of the revised Privacy Policy.</p>
                </div>

                <div className="container">
                    <h2>8. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at [Your Contact Email].</p>
                </div>

                <p className="last-updated">Last Updated: January 16, 2025</p>

            </div>

            <Footer />
        </motion.div>
    )
}