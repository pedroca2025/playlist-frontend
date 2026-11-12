import {http} from "@/lib/http"
import { Musica } from "@/domain/musica"

export const musicaService = {
    //função para cadastrar
    cadastrar: async (musica:Musica): Promise<Musica> => {
        const {data} = await http.post<Musica>("/musicas",musica)
        return data
    },

    listar: async (): Promise<Musica[]> =>{
        const {data} = await http.get<Musica[]>('/musicas')
        return data
    },
    
    buscarPorId: async (id: number): Promise<Musica> =>{
        const {data} = await http.get<Musica>(`/musicas/${id}`)
        return data
    },

    editar: async (id:number, musica:Musica): Promise<Musica> =>{
        const {data} = await http.put<Musica>(`/musicas/${id}`, musica)
        return data
    },

    deletar: async (id:number | string): Promise<void> =>{
        await http.delete(`/musicas/${id}`)
    }
}