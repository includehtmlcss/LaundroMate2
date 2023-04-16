import React, { useState } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
    Header,
    IconButton,
    FooterTotal
} from "../../components";
import { FONTS, SIZES, COLORS, icons } from "../../constants";
import { location } from '../Authentication/SignUp';
import { laundry } from '../Home/Home';
import { q1, q2, q3, tot } from '../Laundry/LaundryDetail';
import { Dropdown } from 'react-native-element-dropdown';
import FooterOrderSummary from '../../components/FooterOrderSummary';

const OrderSummary = ({ navigation, route }) => {
    function renderHeader() {
        return (
            <Header
                title="ORDER SUMMARY"
                containerStyle={{
                    height: 50,
                    marginHorizontal: SIZES.padding,
                    marginTop: 25,
                    alignItems: 'center'
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

    const orderSummaryArr = [];
    const qty = [q1, q2, q3];
    const items = (q1 > 0 ? 1 : 0) + (q2 > 0 ? 1 : 0) + (q3 > 0 ? 1 : 0);
    for (let i = 0; i < 3; i++) {
        if (qty[i] != 0) {
            orderSummaryArr.push(
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: SIZES.radius,
                        paddingHorizontal: SIZES.radius,
                        justifyContent: 'space-between'
                    }}
                    key={laundry.services[i].id}
                >
                    <View
                        style={{
                            height: 60,
                            width: 60,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray2,
                            marginRight: SIZES.padding - 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: 8
                        }}
                    >
                        <Image
                            source={laundry.services[i].img}
                            resizeMode="contain"
                            style={{
                                height: 60,
                                tintColor: COLORS.primary,
                            }}
                        />
                    </View>
                    <Text
                        style={{
                            ...FONTS.body3,
                            flex: 4
                        }}
                    >
                        {laundry.services[i].name}
                    </Text>
                    <Text
                        style={{
                            ...FONTS.body3,
                            flex: 1
                        }}
                    >
                        {qty[i] + "x"}
                    </Text>
                    <Text
                        style={{
                            ...FONTS.body3,
                            flex: 1,
                            textAlign: 'right'
                        }}
                    >
                        ₹{qty[i] * laundry.services[i].price}
                    </Text>
                </View>
            );
        }
    }
    function renderOrderSummary() {
        return (
            <View
                style={{
                    // marginTop: SIZES.padding
                    marginTop: SIZES.radius,
                }}
            >
                {orderSummaryArr}
            </View>
        )
    }


    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* Body */}
            <KeyboardAwareScrollView
                keyboardDismissMode="on-drag"
                extraScrollHeight={-200}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 20
                }}
            >

                <Text style={{ ...FONTS.h3, marginTop: SIZES.padding }}>Order Summary - {laundry.name}</Text>
                {renderOrderSummary()}

            </KeyboardAwareScrollView>
            <FooterOrderSummary
                subTotal={tot}
                shippingFee={0.00}
                total={tot}
                onPress={() => navigation.replace("Success")}
            />
        </View>
    )
}
export default OrderSummary;