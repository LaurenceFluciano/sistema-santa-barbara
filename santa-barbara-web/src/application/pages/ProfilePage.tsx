import { useState } from "react";
import { Card } from "@/ui/components/card";
import { Avatar } from "@/ui/components/avatar";
import { Input } from "@/ui/components/input";
import { Button } from "@/ui/components/button";
import { Edit2, Save, X } from "lucide-react";

export function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");

    const [profile, setProfile] = useState({
        fullName: "Felipe Elias Leal",
        email: "Testes123@gmail.com",
        role: "Aluno",
        phone: "(48) 99173-2269",
        adress: "45 R. Pref. Flávio Righeto",
        instrumentos: "Trompete"
    });

    const handleInputChange = (field: string, value: string) => {
        setProfile((prevProfile) => ({ ...prevProfile, [field]: value }));
    };

    const handleSave = async () => {


            setSuccessMessage("Dados atualizados com sucesso!");
            setIsEditing(false);

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold text-(--strong-foreground-color)]">Meu Perfil</h1>

        {successMessage && (
                <div className="p-4 text-sm text-green-800 rounded-lg bg-green-50 border border-green-200 transition-all">
                    {successMessage}
                </div>
            )}
         
            <Card className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Avatar  className="w-20 h-20" />
                    <div>
                        <h2 className="text-4xl font-bold text-(--strong-foreground-color)]">
                            {profile.fullName}
                        </h2>
                        <p className="text-xl text-(--strong-foreground-color)">{profile.role}</p>
                    </div>
                </div>

                <div>
                    {!isEditing ? (
                        <Button variant="normal" onClick={() => setIsEditing(true)}>
                            <Edit2 className="w-4 h-4 mr-2 inline" /> Editar
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                                <X className="w-4 h-4 mr-2 inline" /> Cancelar
                            </Button>
                            <Button variant="normal" onClick={handleSave}>
                                <Save className="w-4 h-4 mr-2 inline" /> Salvar
                            </Button>
                        </div>
                    )}
                </div>
            </Card>

            <Card className="space-y-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-start gap-2 border-b border-gray-100 pb-3">
                        <span className="text-2xl font-semibold text-(--strong-foreground-color) ">Telefone:</span>
                        <div >
                            {!isEditing ? (
                                <span className=" text-gray-900 text-lg" >{profile.phone}</span>
                            ) : (
                                <Input 
                                    value={profile.phone} 
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-start gap-2 border-b border-gray-100 pb-3">
                        <span className="text-2xl font-semibold text-(--strong-foreground-color) ">Endereço:</span>
                        <div>
                            {!isEditing ? (
                                <span className="text-gray-900 text-lg">{profile.adress}</span>
                            ) : (
                                <Input 
                                    value={profile.adress} 
                                    onChange={(e) => handleInputChange("adress", e.target.value)}
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-start gap-2 border-b border-gray-100 pb-3">
                        <span className="text-2xl font-semibold text-(--strong-foreground-color) ">Gmail:</span>
                        <div >
                            {!isEditing ? (
                                <span className="text-gray-900 text-lg">{profile.email}</span>
                            ) : (
                                <Input 
                                    value={profile.email} 
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-start gap-2">
                        <span className="text-2xl font-semibold text-(--strong-foreground-color) ">Instrumentos:</span>
                        <div >
                            {!isEditing ? (
                                <span className="text-lg text-gray-900">{profile.instrumentos}</span>
                            ) : (
                                <Input 
                                    value={profile.instrumentos} 
                                    onChange={(e) => handleInputChange("instrumentos", e.target.value)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default ProfilePage;