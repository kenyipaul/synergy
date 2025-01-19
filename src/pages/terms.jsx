import Footer from "../layout/Footer"
import { motion } from "framer-motion"

export default function  TermsAndConditions() {
    return (
        <motion.div 
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
        className="terms-and-conditions">
            <div className="content">
                <h1>Synergy - Terms and Conditions</h1>

                <p>Welcome to Synergy! These Terms and Conditions ("Terms") govern your use of the Synergy website and platform (the "Platform"), which is designed to connect people through events and communities. By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use the Platform.</p>

                <div className="container">
                    <h2>1. User Accounts</h2>
                    <ol>
                        <li>You must be at least 13 years old to create an account on the Platform.</li>
                        <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
                        <li>You agree to provide accurate and complete information when creating your account and to update your information as needed.</li>
                        <li>We reserve the right to suspend or terminate your account if we believe you have violated these Terms.</li>
                    </ol>
                </div>

                <div className="container">
                    <h2>2. User Content</h2>
                    <ol>
                        <li>You are solely responsible for any content you post, upload, or otherwise make available on the Platform ("User Content").</li>
                        <li>You represent and warrant that you have all necessary rights to your User Content and that it does not infringe on the rights of any third party.</li>
                        <li>You agree not to post User Content that is:
                            <ul>
                                <li>Unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable;</li>
                                <li>Infringing on any intellectual property rights;</li>
                                <li>Containing viruses or other malicious code;</li>
                                <li>Used for spamming or other unauthorized commercial purposes.</li>
                            </ul>
                        </li>
                        <li>We reserve the right to remove any User Content that violates these Terms.</li>
                    </ol>
                </div>

                <div className="container">
                    <h2>3. Events and Communities</h2>
                    <ol>
                        <li>The Platform provides tools for organizing and promoting events and communities.</li>
                        <li>You are responsible for the content and conduct of any events or communities you create or manage on the Platform.</li>
                        <li>We are not responsible for the actions or conduct of any users or attendees at events or within communities.</li>
                    </ol>
                </div>

                <div className="container">
                    <h2>4. Intellectual Property</h2>
                    <p>The Platform and its content (excluding User Content) are owned by Synergy and are protected by copyright and other intellectual property laws.</p>
                </div>

                <div className="container">
                    <h2>5. Disclaimer of Warranties</h2>
                    <p>The Platform is provided "as is" without any warranties of any kind, either express or implied.</p>
                </div>

                <div className="container">
                    <h2>6. Limitation of Liability</h2>
                    <p>To the fullest extent permitted by law, Synergy shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your use or inability to use the Platform; (b) any unauthorized access to or use of our servers and/or any personal information stored therein; (c) any interruption or cessation of transmission to or from the Platform; (d) any bugs, viruses, trojan horses, or the like that may be transmitted to or through our Platform by any third party; (e) any errors or omissions in any content or for any loss or damage of any kind incurred as a result of your use of any content posted, emailed, transmitted, or otherwise made available via the Platform.</p>
                </div>

                <div className="container">
                    <h2>7. Governing Law</h2>
                    <p>These Terms shall be governed by and construed in accordance with the laws of Kigali/Rwanda, without regard to its conflict of law principles.</p>
                </div>

                <div className="container">
                    <h2>8. Changes to These Terms</h2>
                    <p>We reserve the right to modify these Terms at any time. We will post any changes on the Platform, and your continued use of the Platform after such changes constitutes your acceptance of the revised Terms.</p>
                </div>
                    
                <div className="container">
                    <h2>9. Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us at <b>synergy@tutamail.com.</b></p>
                </div>

                <p className="last-updated">Last Updated: January 16, 2025</p>
            </div>

            <Footer />
        </motion.div>
    )
}