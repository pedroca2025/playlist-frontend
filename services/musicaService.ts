
// Local do arquivo: src/services/musicaService.ts (ou onde você criou esse arquivo)

import { http } from "@/lib/http"
import { Musica } from "@/domain/musica"
import { AxiosError } from "axios"

export const musicaService = {
    cadastrar: async (musica: Musica): Promise<Musica> => {
        try {
            // Tenta enviar a música para o backend
            const { data } = await http.post<Musica>("/musicas", musica)
            return data
        } catch (erro) {
            // Se der erro, verificamos se é um erro do Axios com resposta do servidor
            if (erro instanceof AxiosError && erro.response) {
                // Isso vai mostrar no console do navegador a mensagem EXATA que o backend retornou
                console.error("Erro detalhado do servidor:", erro.response.data)
            } else {
                // Erro de rede (ex: backend desligado) ou outro problema
                console.error("Erro de rede ou configuração:", erro)
            }
            
            // Repassa o erro para a tela/página que chamou o serviço
            throw erro
        }
    }
}