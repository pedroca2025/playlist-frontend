"use client"

import {Musica} from "@/lib/http"

export default function MusicaLista(){

    return(
        <div classname="overflow-x-auto bg-white rounded-2x1 shadow-md">
        <table className="w-full divide-y divide-gray-200">
        <thead classname="bg-gray-100">
                
                <tr>    
                    <th classname="px-4 py-3 text-sm text-xs font-semibold text-gray-700">Título</th>
                    <th classname="px-4 py-3 text-sm text-xs font-semibold text-gray-700">Artista</th>
                    <th classname="px-4 py-3 text-sm text-xs font-semibold text-gray-700">Álbum</th>
                    <th classname="px-4 py-3 text-sm text-xs font-semibold text-gray-700">Ano</th>
                    <th classname="px-4 py-3 text-sm text-xs font-semibold text-gray-700">Ação</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td>
                            
                        </td>
                    </tr>
                    <th>
                        Ano
                    </th>
                </tr>
            </table>
        </div>
    )
}