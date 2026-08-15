import Script from "next/script";

export function Analytics() {
	return (
		<Script
			defer
			src="https://cloud.umami.is/script.js"
			data-website-id="703519fb-d3f2-44ba-bc48-051dceb692ee"
		/>
	);
}
