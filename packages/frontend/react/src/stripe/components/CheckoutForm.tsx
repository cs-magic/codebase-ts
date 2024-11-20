"use client";

import React, { useState } from "react";

import CustomDonationInput from "@/stripe/components/CustomDonationInput";
import { CURRENCY, MAX_AMOUNT, MIN_AMOUNT , AMOUNT_STEP } from "@/stripe/config";
import { createCheckoutSession } from "@/stripe/stripe.actions";
import { formatAmountForDisplay } from "@/stripe/utils";


export default function CheckoutForm(): JSX.Element {
  const [loading] = useState<boolean>(false);
  const [input, setInput] = useState<{
    customDonation: number;
  }>({
    customDonation: Math.round(MAX_AMOUNT / AMOUNT_STEP),
  });

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ): void =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  return (
    <form action={createCheckoutSession}>
      <CustomDonationInput
        className="checkout-style"
        currency={CURRENCY}
        max={MAX_AMOUNT}
        min={MIN_AMOUNT}
        name="customDonation"
        step={AMOUNT_STEP}
        value={input.customDonation}
        onChange={handleInputChange}
      />
      {/* <StripeTestCards /> */}
      <button
        className="checkout-style-background"
        disabled={loading}
        type="submit"
      >
        Donate {formatAmountForDisplay(input.customDonation, CURRENCY)}
      </button>
    </form>
  );
}
