import type { Metadata } from "next";
import Link from "next/link";

import CheckoutOneTimePaymentSvg from "@assets/others/checkout-one-time-payments.svg";
import ElementsCardPaymentSvg from "@assets/others/elements-card-payment.svg";

const metadata: Metadata = {
  title: "Home | Next.js + TypeScript Example",
};

export default function IndexPage(): JSX.Element {
  return (
    <ul className="card-list">
      <li>
        <Link
          href="/donate-with-checkout"
          className="card checkout-style-background"
        >
          <h2 className="bottom">Donate with Checkout</h2>
          <CheckoutOneTimePaymentSvg />
        </Link>
      </li>
      <li>
        <Link
          href="/donate-with-elements"
          className="card elements-style-background"
        >
          <h2 className="bottom">Donate with Elements</h2>
          <ElementsCardPaymentSvg />
        </Link>
      </li>
    </ul>
  );
}
