export default function Navbar() {
	return (
		<div className="flex items-center justify-between p-9 px-15 mb-15">
			<h1>IP Shield</h1>

			<ul className="flex gap-8 cursor-pointer">
				<li>Home</li>
				<li>Docs</li>
				<li>About</li>
				<li>Contact</li>
			</ul>

			<button className="cursor-pointer">Try Now</button>
		</div>
	);
}