"use client";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

interface ImageCardProps {
	number: string;
	expiry: string;
	cvc: string;
	name: string;
}

export default function ImageCard({number, expiry, cvc, name}: ImageCardProps) {
	return (
		<div className="shadow-md rounded-[15px]">
			<Cards number={number} expiry={expiry} cvc={cvc} name={name} />
		</div>
	);
}
