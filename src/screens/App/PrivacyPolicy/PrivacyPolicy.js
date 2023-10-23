import React from 'react';
import {
	View,
	Text,
	SafeAreaView,
	ImageBackground,
	Image,
	Linking,
	ScrollView,
} from 'react-native';
import {appIcons} from '../../../utilities';
import styles from './styles';
import {BulletText, ProfileHeader} from '../../../components';
import PropTypes from 'prop-types';

const PrivacyPolicy = ({navigation}) => {
	return (
		<SafeAreaView style={styles.main}>
			<ProfileHeader
				containerStyle={styles.headerStyle}
				onPress={() => {
					navigation.pop();
				}}
			/>
			<View style={styles.subContainer}>
				<ImageBackground
					source={appIcons.bulbTrans}
					style={styles.bgStyle}
					resizeMethod="auto">
					<View style={styles.headerView}>
						<Image source={appIcons.security} style={styles.iconStyle} />
						<Text style={styles.headerText}>Privacy Policy</Text>
					</View>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.container}>
						<Text style={styles.title}>Privacy Policy</Text>
						<Text style={styles.subTitle}>
							WinRate Consulting LLC built the WinRate App as a Free app. This
							SERVICE is provided by WinRate Consulting LLC at no cost and is
							intended for use as is.
						</Text>
						<Text style={styles.subTitle}>
							This page is used to inform visitors regarding our policies with
							the collection, use, and disclosure of Personal Information if
							anyone decided to use our Service.
						</Text>
						<Text style={styles.subTitle}>
							If you choose to use our Service, then you agree to the collection
							and use of information in relation to this policy. The Personal
							Information that we collect is used for providing and improving
							the Service we offer. We will not use or share your information
							with anyone except as described in this Privacy Policy.
						</Text>
						<Text style={styles.subTitle}>
							The terms used in this Privacy Policy have the same meanings as in
							our Terms and Conditions, which are accessible at WinRate App
							unless otherwise defined in this Privacy Policy.
						</Text>
						<Text style={styles.title}>Information Collection and Use</Text>
						<Text style={styles.subTitle}>
							For a better experience, while using our Service, we may require
							you to provide us with certain personally identifiable
							information, including but not limited to name, email, phone
							number, address, social media handles. The information that we
							request will be retained by us and used as described in this
							privacy policy.
						</Text>
						<Text style={styles.subTitle}>
							The app does use third-party services that may collect information
							used to identify you. Link to the privacy policy of third-party
							service providers used by the app
						</Text>
						<BulletText
							text={'Google Play Services'}
							colored
							url={'https://www.google.com/policies/privacy/'}
						/>
						<BulletText
							text={'Facebook'}
							colored
							url={'https://www.facebook.com/about/privacy/update/printable'}
						/>
						<Text style={styles.title}>Log Data</Text>
						<Text style={styles.subTitle}>
							We want to inform you that whenever you use our Service, in a case
							of an error in the app we collect data and information (through
							third-party products) on your phone called Log Data. This Log Data
							may include information such as your device Internet Protocol
							(“IP”) address, device name, operating system version, the
							configuration of the app when utilizing our Service, the time and
							date of your use of the Service, and other statistics.
						</Text>
						<Text style={styles.title}>Cookies</Text>
						<Text style={styles.subTitle}>
							Cookies are files with a small amount of data that are commonly
							used as anonymous unique identifiers. These are sent to your
							browser from the websites that you visit and are stored on your
							device's internal memory.
						</Text>
						<Text style={styles.subTitle}>
							This Service does not use these “cookies” explicitly. However, the
							app may use third-party code and libraries that use “cookies” to
							collect information and improve their services. You have the
							option to either accept or refuse these cookies and know when a
							cookie is being sent to your device. If you choose to refuse our
							cookies, you may not be able to use some portions of this Service.
						</Text>
						<Text style={styles.title}>Service Providers</Text>
						<Text style={styles.subTitle}>
							We may employ third-party companies and individuals due to the
							following reasons:
						</Text>
						<BulletText text={'To facilitate our Service'} />
						<BulletText text={'To provide the Service on our behalf;'} />
						<BulletText text={'To perform Service-related services; or'} />
						<BulletText
							text={'To assist us in analyzing how our Service is used.'}
						/>
						<Text style={styles.subTitle}>
							We want to inform users of this Service that these third parties
							have access to their Personal Information. The reason is to
							perform the tasks assigned to them on our behalf. However, they
							are obligated not to disclose or use the information for any other
							purpose.
						</Text>
						<Text style={styles.title}>Security</Text>
						<Text style={styles.subTitle}>
							We value your trust in providing us your Personal Information,
							thus we are striving to use commercially acceptable means of
							protecting it. But remember that no method of transmission over
							the internet, or method of electronic storage is 100% secure and
							reliable, and we cannot guarantee its absolute security.
						</Text>
						<Text style={styles.title}>Links to Other Sites</Text>
						<Text style={styles.subTitle}>
							This Service may contain links to other sites. If you click on a
							third-party link, you will be directed to that site. Note that
							these external sites are not operated by us. Therefore, we
							strongly advise you to review the Privacy Policy of these
							websites. We have no control over and assume no responsibility for
							the content, privacy policies, or practices of any third-party
							sites or services.
						</Text>
						<Text style={styles.title}>Children’s Privacy</Text>
						<Text style={styles.subTitle}>
							These Services do not address anyone under the age of 13. We do
							not knowingly collect personally identifiable information from
							children under 13 years of age. In the case we discover that a
							child under 13 has provided us with personal information, we
							immediately delete this from our servers. If you are a parent or
							guardian and you are aware that your child has provided us with
							personal information, please contact us so that we will be able to
							do the necessary actions.
						</Text>
						<Text style={styles.title}>Changes to This Privacy Policy</Text>
						<Text style={styles.subTitle}>
							We may update our Privacy Policy from time to time. Thus, you are
							advised to review this page periodically for any changes. We will
							notify you of any changes by posting the new Privacy Policy on
							this page. This policy is effective as of 2023-03-20
						</Text>
						<Text style={styles.title}>Contact Us</Text>
						<Text style={styles.subTitle}>
							If you have any questions or suggestions about our Privacy Policy,
							do not hesitate to contact us at{' '}
							<Text
								style={styles.title}
								onPress={() =>
									Linking.openURL('mailto:support@winrateconsulting.com')
								}>
								support@winrateconsulting.com.
							</Text>
						</Text>
						<Text style={styles.subTitle}>
							This privacy policy page was created at{' '}
							<Text
								style={styles.bulletTextBlue}
								onPress={() =>
									Linking.openURL('https://privacypolicytemplate.net/')
								}>
								privacypolicytemplate.net{' '}
							</Text>
							and modified/generated by{' '}
							<Text
								style={styles.bulletTextBlue}
								onPress={() =>
									Linking.openURL(
										'https://app-privacy-policy-generator.nisrulz.com/',
									)
								}>
								App Privacy Policy Generator
							</Text>
						</Text>
					</ScrollView>
				</ImageBackground>
			</View>
		</SafeAreaView>
	);
};

PrivacyPolicy.propTypes = {
	navigation: PropTypes.shape({
		pop: PropTypes.func,
	}),
};

export default PrivacyPolicy;