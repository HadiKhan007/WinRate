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

const TermsConditions = ({navigation}) => {
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
						<Text style={styles.headerText}>Terms & Conditions</Text>
					</View>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.container}>
						<Text style={styles.title}>Terms & Conditions</Text>
						<Text style={styles.subTitle}>
							By downloading or using the app, these terms will automatically
							apply to you – you should make sure therefore that you read them
							carefully before using the app. You’re not allowed to copy or
							modify the app, any part of the app, or our trademarks in any way.
							You’re not allowed to attempt to extract the source code of the
							app, and you also shouldn’t try to translate the app into other
							languages or make derivative versions. The app itself, and all the
							trademarks, copyright, database rights, and other intellectual
							property rights related to it, still belong to WinRate Consulting
							LLC.
						</Text>
						<Text style={styles.subTitle}>
							WinRate Consulting LLC is committed to ensuring that the app is as
							useful and efficient as possible. For that reason, we reserve the
							right to make changes to the app or to charge for its services, at
							any time and for any reason. We will never charge you for the app
							or its services without making it very clear to you exactly what
							you’re paying for.
						</Text>
						<Text style={styles.subTitle}>
							The WinRate App app stores and processes personal data that you
							have provided to us, to provide our Service. It’s your
							responsibility to keep your phone and access to the app secure. We
							therefore recommend that you do not jailbreak or root your phone,
							which is the process of removing software restrictions and
							limitations imposed by the official operating system of your
							device. It could make your phone vulnerable to
							malware/viruses/malicious programs, compromise your phone’s
							security features and it could mean that the WinRate App app won’t
							work properly or at all.
						</Text>
						<Text style={styles.subTitle}>
							The app does use third-party services that declare their Terms and
							Conditions. Link to Terms and Conditions of third-party service
							providers used by the app
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
						<Text style={styles.subTitle}>
							You should be aware that there are certain things that WinRate
							Consulting LLC will not take responsibility for. Certain functions
							of the app will require the app to have an active internet
							connection. The connection can be Wi-Fi or provided by your mobile
							network provider, but WinRate Consulting LLC cannot take
							responsibility for the app not working at full functionality if
							you don’t have access to Wi-Fi, and you don’t have any of your
							data allowance left.
						</Text>
						<Text style={styles.subTitle}>
							If you’re using the app outside of an area with Wi-Fi, you should
							remember that the terms of the agreement with your mobile network
							provider will still apply. As a result, you may be charged by your
							mobile provider for the cost of data for the duration of the
							connection while accessing the app, or other third-party charges.
							In using the app, you’re accepting responsibility for any such
							charges, including roaming data charges if you use the app outside
							of your home territory (i.e. region or country) without turning
							off data roaming. If you are not the bill payer for the device on
							which you’re using the app, please be aware that we assume that
							you have received permission from the bill payer for using the
							app.
						</Text>
						<Text style={styles.subTitle}>
							Along the same lines, WinRate Consulting LLC cannot always take
							responsibility for the way you use the app i.e. You need to make
							sure that your device stays charged – if it runs out of battery
							and you can’t turn it on to avail the Service, WinRate Consulting
							LLC cannot accept responsibility.
						</Text>
						<Text style={styles.subTitle}>
							With respect to WinRate Consulting LLC’s responsibility for your
							use of the app, when you’re using the app, it’s important to bear
							in mind that although we endeavor to ensure that it is updated and
							correct at all times, we do rely on third parties to provide
							information to us so that we can make it available to you. WinRate
							Consulting LLC accepts no liability for any loss, direct or
							indirect, you experience as a result of relying wholly on this
							functionality of the app.
						</Text>
						<Text style={styles.subTitle}>
							At some point, we may wish to update the app. The app is currently
							available on Android & iOS – the requirements for the both systems
							(and for any additional systems we decide to extend the
							availability of the app to) may change, and you’ll need to
							download the updates if you want to keep using the app. WinRate
							Consulting LLC does not promise that it will always update the app
							so that it is relevant to you and/or works with the Android & iOS
							version that you have installed on your device. However, you
							promise to always accept updates to the application when offered
							to you. We may also wish to stop providing the app, and may
							terminate use of it at any time without giving notice of
							termination to you. Unless we tell you otherwise, upon any
							termination, (a) the rights and licenses granted to you in these
							terms will end; (b) you must stop using the app, and (if needed)
							delete it from your device.
						</Text>
						<Text style={styles.title}>
							Changes to This Terms and Conditions
						</Text>
						<Text style={styles.subTitle}>
							We may update our Terms and Conditions from time to time. Thus,
							you are advised to review this page periodically for any changes.
							We will notify you of any changes by posting the new Terms and
							Conditions on this page. These terms and conditions are effective
							as of 2023-03-20
						</Text>
						<Text style={styles.title}>Contact Us</Text>
						<Text style={styles.subTitle}>
							If you have any questions or suggestions about our Terms and
							Conditions, do not hesitate to contact us at{' '}
							<Text
								style={styles.title}
								onPress={() =>
									Linking.openURL('mailto:support@winrateconsulting.com')
								}>
								support@winrateconsulting.com.
							</Text>
						</Text>
						<Text style={styles.subTitle}>
							This Terms and Conditions page was generated by{' '}
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

TermsConditions.propTypes = {
	navigation: PropTypes.shape({
		pop: PropTypes.func,
	}),
};

export default TermsConditions;
