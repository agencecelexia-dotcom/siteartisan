"use client"

import React, { useEffect, useState } from "react"
import { isSupabaseConfigured } from "@/lib/supabase"

export default function TestPage() {
  const [supabaseStatus, setSupabaseStatus] = useState<string>("Vérification...")
  const [envVars, setEnvVars] = useState<Record<string, string>>({})

  useEffect(() => {
    // Check Supabase configuration
    const configured = isSupabaseConfigured()
    setSupabaseStatus(configured ? "✅ Configuré" : "❌ Non configuré")

    // Check environment variables
    const vars: Record<string, string> = {
      "NEXT_PUBLIC_SUPABASE_URL": process.env.NEXT_PUBLIC_SUPABASE_URL || "⚠️ Non défini",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Défini" : "❌ Non défini",
      "SUPABASE_SERVICE_ROLE_KEY": process.env.SUPABASE_SERVICE_ROLE_KEY ? "✅ Défini" : "❌ Non défini",
      "NEXT_PUBLIC_ADMIN_PASSWORD": process.env.NEXT_PUBLIC_ADMIN_PASSWORD ? "✅ Défini" : "❌ Non défini",
    }
    setEnvVars(vars)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6">🔍 Test Supabase</h1>

        <div className="space-y-6">
          {/* Supabase Status */}
          <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
            <h2 className="text-lg font-semibold text-blue-900">Status Supabase</h2>
            <p className="text-blue-700 mt-2">{supabaseStatus}</p>
          </div>

          {/* Environment Variables */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Variables d'environnement</h2>
            <div className="space-y-2">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-mono text-sm text-gray-700">{key}</span>
                  <span className="text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What to do next */}
          <div className="border-l-4 border-green-500 bg-green-50 p-4">
            <h2 className="text-lg font-semibold text-green-900">Prochaines étapes</h2>
            <ol className="text-green-700 mt-2 list-decimal list-inside space-y-1">
              <li>Si Supabase est "Configuré", va à <code className="bg-white px-1">/admin</code></li>
              <li>Rentre le mot de passe: <code className="bg-white px-1">Celexia@2006</code></li>
              <li>Tu devrais voir le dashboard avec le bouton "Importer les artisans"</li>
            </ol>
          </div>

          {/* Debug Info */}
          <div className="bg-gray-100 p-4 rounded text-sm text-gray-600 font-mono">
            <p>Si tu vois "Non configuré", c'est que les env vars ne sont pas bien définies sur Vercel.</p>
            <p className="mt-2">Vérifie que tu as bien ajouté les 4 variables dans Vercel Settings → Environment Variables</p>
          </div>
        </div>
      </div>
    </div>
  )
}
