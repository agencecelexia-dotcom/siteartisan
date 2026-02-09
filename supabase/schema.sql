-- SiteArtisan - Schema Supabase
-- Executer dans Supabase SQL Editor: https://supabase.com/dashboard/project/xkokjxwfeookisasnamz/sql/new

-- Supprimer l'ancienne table si elle existe
DROP TABLE IF EXISTS artisans;

-- Creer la table artisans (colonnes alignees avec le frontend)
CREATE TABLE artisans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identite
  business_name VARCHAR(255) NOT NULL,
  trades TEXT[] DEFAULT ARRAY[]::text[],
  profile_photo TEXT,
  cover_photo TEXT,
  founded_year INTEGER,

  -- Contact
  phone VARCHAR(20),
  email VARCHAR(255) NOT NULL,
  website VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(10),
  department VARCHAR(100),
  facebook VARCHAR(255),
  instagram VARCHAR(255),
  linkedin VARCHAR(255),

  -- Presentation
  short_description TEXT,
  full_description TEXT,
  service_area TEXT[] DEFAULT ARRAY[]::text[],
  service_radius INTEGER DEFAULT 30,

  -- Expertise
  project_types TEXT[] DEFAULT ARRAY[]::text[],
  specialties TEXT,
  certifications TEXT[] DEFAULT ARRAY[]::text[],
  insurances TEXT[] DEFAULT ARRAY[]::text[],
  guarantees TEXT,
  labels TEXT[] DEFAULT ARRAY[]::text[],

  -- Notes
  rating_average DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,

  -- Statut
  is_certified BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'active',

  -- SEO
  meta_title TEXT,
  meta_description TEXT,

  -- Portfolio (JSON array of {imageUrl, description})
  portfolio JSONB DEFAULT '[]'::jsonb,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les requetes frequentes
CREATE INDEX idx_artisans_status ON artisans(status);
CREATE INDEX idx_artisans_city ON artisans(city);
CREATE INDEX idx_artisans_trades ON artisans USING GIN(trades);
CREATE INDEX idx_artisans_created ON artisans(created_at DESC);

-- Row Level Security
ALTER TABLE artisans ENABLE ROW LEVEL SECURITY;

-- Lecture publique (artisans actifs)
CREATE POLICY "Public read active artisans" ON artisans
  FOR SELECT USING (status = 'active');

-- Insert pour tous (protege par le mot de passe admin cote client)
CREATE POLICY "Allow insert" ON artisans
  FOR INSERT WITH CHECK (true);

-- Update pour tous
CREATE POLICY "Allow update" ON artisans
  FOR UPDATE USING (true) WITH CHECK (true);

-- Delete pour tous
CREATE POLICY "Allow delete" ON artisans
  FOR DELETE USING (true);
