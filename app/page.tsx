"use client"

import { useEffect, useState } from "react"
import { musicaService } from "@/services/musicaService"
import { useRouter } from "next/navigation"

export default function MusicaLista(){
  const [musicas, setMusicas] = useState<any[]>([])

  const router = useRouter()

  useEffect(()=>{
    carregar()

  },[])

  const carregar = async ()=>{
    try{
    const lista = await musicaService.listar()
    setMusicas(lista)
    console.log(lista)
    }catch(e){
      console.log("Erro",e)
    }
  }
  const cadastrar = async ()=>{
    router.push("./cadastro")

  }
    const editar = async(id: number)=>{
      router.push(`/edicao?id=${id}`)
    }

    const excluir = async (id: number)=>{
      const acao = confirm("Tem certeza que deseja excluir ?")
      if(!acao) return
      try{
        await musicaService.deletar(id)
        await carregar()

      }catch(e){
        console.log("Erro",e)

      }
   }
return(
  <div className="mx-auto w-4/5 overflow x-auto bg-white rounded -2x1 shadow-md m-5">
    <h1 className="mx-auto text-1 mb-5 text-center font-bold">Lista De Musicas </h1>
    <button onClick={cadastrar}
    className="block ml-auto mb-2 bg-green-700 hover:bg-green-300
    text-white font-semibold rounded-lg px-4 py-2 transition">Cadastrar</button>
    <table className="min-w-full divide-y divide-gray-600">
      <thead className="bg-gray-100">
    <tr>
    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Id</th>
    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Título</th>
    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Artista</th>
    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Álbum</th>
    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ação</th>
    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ano</th>
   
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {musicas.map((m)=>(
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.titulo}</td>
              <td>{m.artista}</td>
              <td>{m.album}</td>
              <td>{m.ano}</td>
              <td>
                <button onClick={()=>editar(m.id)}
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-300 m-2 text-white font-semibold rounded-lg px-4 py-2 transition disabel:opacity-50"                
                >Editar</button>
                
                <button onClick={()=>excluir(m.id)}
                  className="flex-1 bg-red-600 hover:bg-red-300 m-2 text-white font-semibold rounded-lg px-4 py-2 transition disabel:opacity-50"
                  
                  >Excluir</button> 
              </td>
              </tr>
          ))}
        </tbody>
      </table>
   </div>
)
}