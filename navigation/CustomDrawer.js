import React from "react";
import { View, Text, Image, TouchableOpacity, Touchable } from "react-native";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
} from "@react-navigation/drawer";
import Animated from "react-native-reanimated";
import { MainLayout } from "../screens";
import {
	COLORS,
	FONTS,
	SIZES,
	constants,
	icons,
	dummyData,
} from "../constants";
import { connect } from "react-redux";
import { setSelectedTab } from "../stores/tab/tabActions";

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
	return (
		<TouchableOpacity
			style={{
				flexDirection: "row",
				height: 40,
				marginBottom: SIZES.base,
				alignItems: "center",
				paddingLeft: SIZES.radius,
				borderRadius: SIZES.base,
				backgroundColor: isFocused ? COLORS.transparentBlack1 : null,
			}}
			onPress={onPress}
		>
			<Image
				source={icon}
				style={{
					width: 20,
					height: 20,
					tintColor: COLORS.white,
				}}
			/>

			<Text
				style={{
					marginLeft: 15,
					color: COLORS.white,
					...FONTS.h3,
				}}
			>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

const CustomDrawerContent = ({ navigation, selectedTab, setSelectedTab }) => {
	return (
		<DrawerContentScrollView
			scrollEnabled={true}
			contentContainerStyle={{ flex: 1 }}
		>
			<View
				style={{
					flex: 1,
					paddingHorizontal: SIZES.radius,
				}}
			>
				{/* Close */}
				<View
					style={{
						alignItems: "flex-start",
						justifyContent: "center",
					}}
				>
					<TouchableOpacity
						style={{
							alignItems: "center",
							justifyContent: "center",
						}}
						onPress={() => navigation.closeDrawer()}
					>
						<Image
							source={icons.cross}
							style={{
								height: 26,
								width: 26,
								tintColor: COLORS.white,
								marginTop: 20,
								marginBottom: 10,
							}}
						/>
					</TouchableOpacity>
				</View>
				{/* Profile */}
				<TouchableOpacity
					style={{
						flexDirection: "row",
						marginTop: SIZES.radius,
						alignItems: "center",
					}}
					onPress={() => console.log("Profile")}
				>
					<Image
						source={dummyData.myProfile.profile_image}
						style={{
							width: 50,
							height: 50,
							borderRadius: SIZES.radius,
						}}
					/>

					<View
						style={{
							marginLeft: SIZES.radius,
						}}
					>
						<Text style={{ color: COLORS.white, ...FONTS.h3 }}>
							{dummyData.myProfile.name}
						</Text>
						<Text style={{ color: COLORS.white, ...FONTS.body4 }}>
							View your profile
						</Text>
					</View>
				</TouchableOpacity>

				{/* Drawer Items */}
				<View
					style={{
						flex: 1,
						marginTop: SIZES.padding,
					}}
				>
					<CustomDrawerItem
						label={constants.screens.home}
						icon={icons.home}
						isFocused={selectedTab == constants.screens.home}
						onPress={() => {
							setSelectedTab(constants.screens.home);
							navigation.navigate("MainLayout");
						}}
					/>
					<CustomDrawerItem
						label={constants.screens.my_wallet}
						icon={icons.wallet}
					/>
					<CustomDrawerItem
						label={constants.screens.notification}
						icon={icons.notification}
						isFocused={selectedTab == constants.screens.notification}
						onPress={() => {
							setSelectedTab(constants.screens.notification);
							navigation.navigate("MainLayout");
						}}
					/>
					<CustomDrawerItem
						label={constants.screens.orders}
						icon={icons.cart}
						isFocused={selectedTab == constants.screens.orders}
						onPress={() => {
							setSelectedTab(constants.screens.orders);
							navigation.navigate("Orders");
						}}
					/>

					{/* Line Divider */}

					<View
						style={{
							height: 1,
							marginVertical: SIZES.radius,
							marginLeft: SIZES.radius,
							backgroundColor: COLORS.lightGray1,
						}}
					/>

					<CustomDrawerItem label="Track Your Order" icon={icons.location} onPress={()=>navigation.navigate("DeliveryStatus")}/>
					<CustomDrawerItem label="Coupons" icon={icons.coupon} />
					<CustomDrawerItem label="Settings" icon={icons.setting} />
					<CustomDrawerItem label="Invite a Friend" icon={icons.profile} />
					<CustomDrawerItem label="Help Center" icon={icons.help} />
				</View>

				<View
					style={{
						marginBottom: SIZES.padding,
					}}
				>
					<CustomDrawerItem label="Logout" icon={icons.logout} />
				</View>
			</View>
		</DrawerContentScrollView>
	);
};

const CustomDrawer = ({ selectedTab, setSelectedTab }) => {
	const [progress, setProgress] = React.useState(new Animated.Value(0));

	const scale = Animated.interpolateNode(progress, {
		inputRange: [0, 1],
		outputRange: [1, 0.8],
	});

	const borderRadius = Animated.interpolateNode(progress, {
		inputRange: [0, 1],
		outputRange: [0, 26],
	});

	const animatedStyle = { borderRadius, transform: [{ scale }] };

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: COLORS.primary,
			}}
		>
			<Drawer.Navigator
				drawerType="slide"
				overlayColor="transparent"
				drawerStyle={{
					flex: 1,
					width: "65%",
					paddingRight: 20,
					backgroundColor: "transparent",
				}}
				sceneContainerStyle={{
					backgroundColor: "transparent",
				}}
				initialRouteName="MainLayout"
				drawerContent={(props) => {
					setTimeout(() => {
						setProgress(props.progress);
					}, 0);
					return (
						<CustomDrawerContent
							navigation={props.navigation}
							selectedTab={selectedTab}
							setSelectedTab={setSelectedTab}
						/>
					);
				}}
			>
				<Drawer.Screen name="MainLayout">
					{(props) => (
						<MainLayout {...props} drawerAnimationStyle={animatedStyle} />
					)}
				</Drawer.Screen>
			</Drawer.Navigator>
		</View>
	);
};

function mapStateToProps(state) {
	return {
		selectedTab: state.tabReducer.selectedTab,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setSelectedTab: (selectedTab) => {
			return dispatch(setSelectedTab(selectedTab));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);
