
"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { musicaService } from "@/services/musicaService"
import type { Musica } from "@/domain/musica"

export default function CadastroPage() {
    const [titulo, setTitulo] = useState("")
    const [artista, setArtista] = useState("")
    const [album, setAlbum] = useState("")
    const [ano, setAno] = useState("")
    const [carregando, setCarregando] = useState(false)
    const [mensagem, setMensagem] = useState("")

    async function cadastrar(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setMensagem("")

        if (!titulo.trim() || !artista.trim() || !album.trim() || !ano) {
            setMensagem("Preencha todos os campos.")
            return
        }

        const anoNumero = Number(ano)

        if (!Number.isInteger(anoNumero) || anoNumero < 1 || anoNumero > new Date().getFullYear()) {
            setMensagem("Informe um ano válido.")
            return
        }

        const musica: Musica = {
            titulo: titulo.trim(),
            artista: artista.trim(),
            album: album.trim(),
            ano: anoNumero
        }

        try {
            setCarregando(true)

            await musicaService.cadastrar(musica)

            setMensagem("Música cadastrada com sucesso!")
            setTitulo("")
            setArtista("")
            setAlbum("")
            setAno("")
        } catch (erro: unknown) {
            console.error("Erro ao cadastrar música:", erro)

            setMensagem(
                erro instanceof Error
                    ? `Erro ao cadastrar: ${erro.message}`
                    : "Não foi possível cadastrar a música. Verifique o backend."
            )
        } finally {
            setCarregando(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={cadastrar}
                className="bg-white w-full max-w-md p-6 rounded-lg shadow space-y-4"
            >
                <h1 className="text-2xl font-bold">Cadastrar Música</h1>

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

                <button
                    type="submit"
                    disabled={carregando}
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50"
                >
                    {carregando ? "Cadastrando..." : "Salvar"}
                </button>

                {mensagem && (
                    <p role="status" className="text-sm text-center">
                        {mensagem}
                    </p>
                )}
            </form>
        </main>
    )
}
