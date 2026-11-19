"use client"

import { useState, useEffect } from "react"
import { musicaService } from "@/services/musicaService"
import { Musica } from "@/domain/musica"
import  {useSearchParams } from "next/navigation"





export default function Editarpage(){
    const [titulo, setTitulo] = useState("")
    const [artista, setArtista] = useState("")
    const [album, setAlbum] = useState("")
    const [ano, setAno] = useState("")
    const [mensagem, setMensagem] = useState("")


    const searchParams = useSearchParams()
    const id = Number(searchParams.get("id"))


    useEffect(()=>{
        carregar()
     },[])
      
async function editar(e: React.FormEvent){
    e.preventDefault()
    setMensagem("")
    const musica: Musica = {titulo,artista,album,ano:Number(ano)}

    try{
        await musicaService.editar(id,musica)
        setMensagem("Musica cadastrada com sucesso!")
        setTitulo("")
        setArtista("")
        setAlbum("")
        setAno("")

    }catch(e:any){
        console.log(e?.message)
        setMensagem("Erro ao Atualizar")
    }
}


async function carregar(){
    try{
    const musica = await musicaService.buscarPorId(id)
      setTitulo(musica.titulo)
      setArtista(musica.artista)
      setAlbum(musica.album)
      setAno(musica.ano.toString())


        
    }catch(e:any){
        console.log(e?.mensagem)
    }
    
}

return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form
            onSubmit={editar}
            className="bg-white w-full max-w-md p-6 rounded-lg shadow space-y-4"
        >
            <h1 className="text-2xl font-bold">Editar Música</h1>

            <input
                required
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
            />

            <input
                required
                placeholder="Artista"
                value={artista}
                onChange={(e) => setArtista(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
            />

            <input
                required
                placeholder="Álbum"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
            />

            <input
                required
                type="number"
                min="1"
                max={new Date().getFullYear()}
                placeholder="Ano"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
            />

            
        
        </form>
    </main>
)
    
}