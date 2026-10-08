import {http} from "@/lib/http"
import { Musica } from "@/domain/musica"

export const musicaService = {

cadastrar: async (musica:Musica): Promise<Musica> =>{
    const {data} = await http.post<Musica>("/musicas",musica)
    return data
    
}
}