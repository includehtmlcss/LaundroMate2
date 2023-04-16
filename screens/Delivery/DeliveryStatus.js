import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import {
    Header,
    LineDivider,
    TextButton,
    TextIconButton,
    IconButton
} from "../../components";

import {
    FONTS, COLORS, SIZES, icons, constants
} from "../../constants";
import { username } from '../Authentication/SignUp';


const DeliveryStatus = ({ navigation }) => {

    const [currentStep, setCurrentStep] = React.useState(1)


    function renderHeader() {
        return (
            <Header
                title="DELIVERY STATUS"
                containerStyle={{
                    height: 50,
                    marginHorizontal: SIZES.padding,
                    marginTop: 25
                }}
                leftComponent={
                    <IconButton
                        icon={icons.back}
                        containerStyle={{
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius,
                            borderWidth: 1,
                            borderColor: COLORS.gray2
                        }}
                        iconStyle={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray2
                        }}
                        onPress={() => navigation.goBack()}
                    />
                }
                rightComponent={
                    <View
                        style={{
                            width: 40
                        }}
                    />
                }
            />
        )
    }

    function renderInfo() {
        return (
            <View
                style={{
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color: COLORS.gray,
                        ...FONTS.body4
                    }}
                >Estimated Delivery</Text>
                <Text
                    style={{
                        textAlign: 'center',
                        ...FONTS.h2
                    }}
                >27 November 2022{"\n"}4:00 PM</Text>

            </View>
        )
    }

    function renderTrackOrder() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    paddingVertical: SIZES.padding,
                    borderRadius: SIZES.radius,
                    borderWidth: 2,
                    borderColor: COLORS.lightGray2,
                    backgroundColor: COLORS.white2
                }}
            >
                {/* Track Order */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 20,
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    <Text style={{ ...FONTS.h3 }}>Track Order</Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>{username}</Text>

                </View>
                <LineDivider
                    lineStyle={{
                        backgroundColor: COLORS.lightGray2
                    }}
                />

                {/* Status */}
                <View
                    style={{
                        marginTop: SIZES.padding,
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    {constants.track_order_status.map((item, index) => {
                        return (
                            <View
                                key={`StatusList-${index}`}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginVertical: -5
                                    }}
                                >
                                    <Image
                                        source={icons.check_circle}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            tintColor: index <= currentStep ? COLORS.primary : COLORS.lightGray1
                                        }}
                                    />
                                    <View
                                        style={{
                                            marginLeft: SIZES.radius
                                        }}
                                    >
                                        <Text style={{ ...FONTS.h3 }}>{item.title}</Text>
                                        <Text style={{
                                            color: COLORS.gray,
                                            ...FONTS.body4
                                        }}>{item.sub_title}</Text>

                                    </View>
                                </View>

                                {index < constants.track_order_status.length - 1 &&
                                    <View>
                                        {index < currentStep &&
                                            <View
                                                style={{
                                                    height: 50,
                                                    width: 3,
                                                    marginLeft: 18,
                                                    backgroundColor: COLORS.primary,
                                                    zIndex: -1
                                                }}
                                            >

                                            </View>
                                        }

                                        {index >= currentStep &&
                                            <Image
                                                source={icons.dotted_line}
                                                resizeMode="cover"
                                                style={{
                                                    width: 4,
                                                    height: 50,
                                                    marginLeft: 17
                                                }}
                                            />
                                        }
                                    </View>
                                }
                            </View>
                        )
                    })}
                </View>

            </View>
        )
    }

    function renderFooter() {
        return (
            <View
                style={{
                    marginTop: SIZES.radius,
                    marginBottom: SIZES.padding
                }}
            >
                {currentStep < constants.track_order_status.length - 1 &&
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: 55
                        }}
                    >
                        {/* Order Summary */}
                        <TextIconButton
                            containerStyle={{
                                flex: 7,
                                borderRadius: SIZES.base,
                                backgroundColor: COLORS.lightGray2
                            }}
                            label="Order Summary"
                            labelStyle={{
                                color: COLORS.primary,
                                ...FONTS.h3
                            }}
                            icon={icons.order_summary}
                            iconPosition="LEFT"
                            iconStyle={{
                                width: 25,
                                height: 25,
                                marginRight: SIZES.base,
                                tintColor: COLORS.primary
                            }}
                            onPress={() => navigation.navigate("OrderSummary")}
                        />

                        {/* Need Help */}
                        <TextIconButton
                            containerStyle={{
                                flex: 6,
                                marginLeft: SIZES.base,
                                borderRadius: SIZES.base,
                                backgroundColor: COLORS.primary
                            }}
                            label="Need Help?"
                            labelStyle={{
                                color: COLORS.white,
                                ...FONTS.h3
                            }}
                            icon={icons.customer_service}
                            iconPosition="LEFT"
                            iconStyle={{
                                width: 25,
                                height: 25,
                                marginRight: SIZES.base,
                                tintColor: COLORS.white
                            }}
                            onPress={() => {
                                console.log("Need Help")
                            }}
                        />

                    </View>
                }
                {currentStep == constants.track_order_status.length - 1 &&
                    <TextButton
                        buttonContainerStyle={{
                            height: 55,
                            borderRadius: SIZES.base
                        }}
                        label="DONE"
                        onPress={() => navigation.navigate("LaundryDetail")}
                    />
                }
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: SIZES.padding,
                backgroundColor: COLORS.white
            }}
        >
            {/* Header */}
            {renderHeader()}
            {/* Info */}
            {renderInfo()}
            {/* Track Order */}
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {renderTrackOrder()}
            </ScrollView>

            {/* Footer */}
            {renderFooter()}
        </View>
    )
}

export default DeliveryStatus;