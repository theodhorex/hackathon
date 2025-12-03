import IPShieldExtension from "../components/Extension_Panel_alven";

export default function ExtensionPage() {
    return (
        <div className="w-full h-screen bg-[#0a0f1d] overflow-hidden flex items-center justify-center">
            <div className="w-[400px] h-[600px] relative overflow-hidden bg-[#0a0f1d]">
                <IPShieldExtension />
            </div>
        </div>
    );
}
