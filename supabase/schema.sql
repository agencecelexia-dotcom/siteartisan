-- Artisans Table for SiteArtisan
-- Run this SQL in your Supabase dashboard under SQL Editor
-- https://app.supabase.com/project/[YOUR_PROJECT_ID]/sql/new

CREATE TABLE artisans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  telephone VARCHAR(20),
  entreprise VARCHAR(255) NOT NULL,
  metier VARCHAR(100) NOT NULL,
  specialite VARCHAR(255),
  telephone_professionnel VARCHAR(20),
  email_professionnel VARCHAR(255),
  adresse TEXT,
  code_postal VARCHAR(10),
  ville VARCHAR(100),
  zone_intervention TEXT,
  site_web VARCHAR(255),
  services TEXT[] DEFAULT ARRAY[]::text[],
  certifications TEXT[] DEFAULT ARRAY[]::text[],
  assurances TEXT[] DEFAULT ARRAY[]::text[],
  photos TEXT[] DEFAULT ARRAY[]::text[],
  avis_count INTEGER DEFAULT 0,
  note_moyenne DECIMAL(3, 2) DEFAULT 0,
  verifie BOOLEAN DEFAULT FALSE,
  actif BOOLEAN DEFAULT TRUE,
  date_creation TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  date_modification TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT email_valid CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Create index for faster queries
CREATE INDEX idx_artisans_metier ON artisans(metier);
CREATE INDEX idx_artisans_ville ON artisans(ville);
CREATE INDEX idx_artisans_actif ON artisans(actif);
CREATE INDEX idx_artisans_date_creation ON artisans(date_creation DESC);

-- Enable Row Level Security
ALTER TABLE artisans ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active artisans
CREATE POLICY "Allow public read on active artisans" ON artisans
  FOR SELECT
  USING (actif = true);

-- Policy: Authenticated users can insert
CREATE POLICY "Allow authenticated users to insert artisans" ON artisans
  FOR INSERT
  WITH CHECK (true);

-- Sample data (optional - remove after testing)
-- INSERT INTO artisans (name, prenom, email, telephone, entreprise, metier, ville, zone_intervention)
-- VALUES
--   ('Dupont', 'Jean', 'jean.dupont@example.com', '01 23 45 67 89', 'Plomberie Dupont', 'Plombier', 'Paris', 'Paris et région parisienne'),
--   ('Martin', 'Pierre', 'pierre.martin@example.com', '02 34 56 78 90', 'Électricité Martin', 'Électricien', 'Lyon', 'Lyon et environs');
