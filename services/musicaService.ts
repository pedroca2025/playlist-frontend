
import { http } from "@/lib/http"
import { Musica } from "@/domain/musica"

export const musicaService = {
    cadastrar: async (musica: Musica): Promise<Musica> => {
    try {
        const { data } = await http.post<Musica>("/musicas", musica)
        return data
    } catch (erro) {
        console.error("Erro ao cadastrar música:", erro)
        throw erro
    }
}
}
