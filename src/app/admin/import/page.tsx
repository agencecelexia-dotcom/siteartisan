"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, CheckCircle, AlertCircle, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { migrateArtisansToSupabase, checkMigrationStatus } from "@/lib/migrate-artisans"

export default function AdminImportPage() {
  const [isImporting, setIsImporting] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [status, setStatus] = useState<"idle" | "importing" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [artisanCount, setArtisanCount] = useState<number | null>(null)

  const handleImport = async () => {
    setIsImporting(true)
    setStatus("importing")
    setMessage("")

    try {
      await migrateArtisansToSupabase()
      setStatus("success")
      setMessage("✅ Les 30 artisans ont été importés avec succès dans Supabase !")
    } catch (error) {
      setStatus("error")
      setMessage(`❌ Erreur lors de l'import: ${error instanceof Error ? error.message : "Erreur inconnue"}`)
    } finally {
      setIsImporting(false)
    }
  }

  const handleCheckStatus = async () => {
    setIsChecking(true)
    try {
      const count = await checkMigrationStatus()
      setArtisanCount(count || 0)
      setMessage(`Base de données: ${count || 0} artisans`)
    } catch (error) {
      setMessage(`Erreur: ${error instanceof Error ? error.message : "Erreur inconnue"}`)
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link href="/admin">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Retour au dashboard
        </Button>
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">Importer les artisans</h1>
        <p className="text-gray-500 mt-1">Importez les 30 artisans existants dans Supabase</p>
      </div>

      {/* Main Card */}
      <Card className="p-8 space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-blue-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Comment ça marche ?
          </h3>
          <ol className="text-sm text-blue-800 space-y-1 ml-7 list-decimal">
            <li>Cliquez sur "Importer les artisans" ci-dessous</li>
            <li>Les 30 artisans seront transférés vers Supabase en arrière-plan</li>
            <li>Vous pourrez les voir dans la page de gestion des artisans</li>
            <li>Les données locales resteront inchangées</li>
          </ol>
        </div>

        {/* Status Message */}
        {status !== "idle" && (
          <div
            className={`rounded-lg p-4 flex items-start gap-3 ${
              status === "success"
                ? "bg-green-50 border border-green-200"
                : status === "error"
                  ? "bg-red-50 border border-red-200"
                  : "bg-amber-50 border border-amber-200"
            }`}
          >
            {status === "success" && <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />}
            {status === "error" && <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />}
            {status === "importing" && <Loader className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-spin" />}

            <div className={status === "success" ? "text-green-800" : status === "error" ? "text-red-800" : "text-amber-800"}>
              <p className="font-medium">{message}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleImport}
            disabled={isImporting}
            size="lg"
            className="gap-2 flex-1 sm:flex-none"
          >
            {isImporting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Import en cours...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Importer les 30 artisans
              </>
            )}
          </Button>

          <Button
            onClick={handleCheckStatus}
            variant="outline"
            disabled={isChecking}
            size="lg"
            className="gap-2"
          >
            {isChecking ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Vérification...
              </>
            ) : (
              "Vérifier le statut"
            )}
          </Button>
        </div>

        {artisanCount !== null && (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              Votre base de données Supabase contient actuellement <strong>{artisanCount}</strong> artisan{artisanCount !== 1 ? "s" : ""}.
            </p>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h4 className="font-semibold text-gray-900">À savoir</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ Les artisans seront importés avec tous les détails (photos, certifications, avis, etc.)</li>
            <li>✓ Les doublons seront ignorés (les emails sont uniques dans Supabase)</li>
            <li>✓ Vous pouvez relancer l'import à tout moment</li>
            <li>✓ Impossible de revenir en arrière, mais vous pouvez modifier/supprimer ensuite</li>
          </ul>
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="p-6 bg-blue-50 border-blue-200 space-y-3">
        <h3 className="font-semibold text-blue-900">Prochaines étapes</h3>
        <ol className="text-sm text-blue-800 space-y-2 ml-5 list-decimal">
          <li>Une fois l'import terminé, allez sur <Link href="/admin/artisans" className="underline font-medium">Gestion des artisans</Link></li>
          <li>Les artisans s'afficheront depuis Supabase (pas depuis les données locales)</li>
          <li>Vous pouvez ajouter, modifier ou supprimer des artisans</li>
          <li>Tous les changements seront sauvegardés dans Supabase</li>
        </ol>
      </Card>
    </div>
  )
}
