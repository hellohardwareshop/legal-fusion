CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.legal_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  ref_code TEXT,
  name TEXT NOT NULL,
  record_type TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.legal_records TO anon, authenticated;
GRANT ALL ON public.legal_records TO service_role;
ALTER TABLE public.legal_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Legal records are open while auth is disabled" ON public.legal_records FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_legal_records_updated_at BEFORE UPDATE ON public.legal_records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_legal_records_category ON public.legal_records (category, position);

CREATE TABLE public.legal_policies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ref_code TEXT NOT NULL,
  name TEXT NOT NULL,
  policy_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  version TEXT NOT NULL,
  last_updated DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_by TEXT NOT NULL,
  compliance_score INTEGER NOT NULL DEFAULT 0,
  content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.legal_policies TO anon, authenticated;
GRANT ALL ON public.legal_policies TO service_role;
ALTER TABLE public.legal_policies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Legal policies are open while auth is disabled" ON public.legal_policies FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_legal_policies_updated_at BEFORE UPDATE ON public.legal_policies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.legal_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ref_code TEXT NOT NULL,
  name TEXT NOT NULL,
  doc_type TEXT NOT NULL,
  uploaded_at DATE NOT NULL DEFAULT CURRENT_DATE,
  uploaded_by TEXT NOT NULL DEFAULT 'LM-A1B2',
  size_label TEXT NOT NULL DEFAULT '0 KB',
  encrypted BOOLEAN NOT NULL DEFAULT true,
  access_level TEXT NOT NULL DEFAULT 'legal_only',
  expiry_date DATE,
  storage_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.legal_documents TO anon, authenticated;
GRANT ALL ON public.legal_documents TO service_role;
ALTER TABLE public.legal_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Legal documents are open while auth is disabled" ON public.legal_documents FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_legal_documents_updated_at BEFORE UPDATE ON public.legal_documents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.legal_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ref_code TEXT NOT NULL,
  alert_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  detected_in TEXT NOT NULL,
  confidence INTEGER NOT NULL DEFAULT 0,
  detected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending',
  ai_suggestion TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.legal_alerts TO anon, authenticated;
GRANT ALL ON public.legal_alerts TO service_role;
ALTER TABLE public.legal_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Legal alerts are open while auth is disabled" ON public.legal_alerts FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_legal_alerts_updated_at BEFORE UPDATE ON public.legal_alerts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.legal_violations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ref_code TEXT NOT NULL,
  violator_type TEXT NOT NULL,
  violator_id TEXT NOT NULL,
  violation_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT NOT NULL,
  evidence TEXT[] NOT NULL DEFAULT '{}',
  detected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending',
  previous_violations INTEGER NOT NULL DEFAULT 0,
  action_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.legal_violations TO anon, authenticated;
GRANT ALL ON public.legal_violations TO service_role;
ALTER TABLE public.legal_violations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Legal violations are open while auth is disabled" ON public.legal_violations FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_legal_violations_updated_at BEFORE UPDATE ON public.legal_violations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.legal_trademark_assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ref_code TEXT NOT NULL,
  name TEXT NOT NULL,
  asset_type TEXT NOT NULL,
  registration_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  expiry_date TEXT NOT NULL DEFAULT '-',
  violations INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.legal_trademark_assets TO anon, authenticated;
GRANT ALL ON public.legal_trademark_assets TO service_role;
ALTER TABLE public.legal_trademark_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trademark assets are open while auth is disabled" ON public.legal_trademark_assets FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_legal_trademark_assets_updated_at BEFORE UPDATE ON public.legal_trademark_assets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.legal_misuse_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ref_code TEXT NOT NULL,
  asset_ref TEXT NOT NULL,
  asset_name TEXT NOT NULL,
  detected_in TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT NOT NULL,
  ai_confidence INTEGER NOT NULL DEFAULT 0,
  detected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.legal_misuse_alerts TO anon, authenticated;
GRANT ALL ON public.legal_misuse_alerts TO service_role;
ALTER TABLE public.legal_misuse_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Misuse alerts are open while auth is disabled" ON public.legal_misuse_alerts FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_legal_misuse_alerts_updated_at BEFORE UPDATE ON public.legal_misuse_alerts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.legal_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ref_code TEXT NOT NULL,
  action TEXT NOT NULL,
  category TEXT NOT NULL,
  actor TEXT NOT NULL,
  details TEXT NOT NULL,
  immutable BOOLEAN NOT NULL DEFAULT true,
  logged_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.legal_logs TO anon, authenticated;
GRANT ALL ON public.legal_logs TO service_role;
ALTER TABLE public.legal_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Legal logs are readable while auth is disabled" ON public.legal_logs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Legal logs can be appended while auth is disabled" ON public.legal_logs FOR INSERT TO anon, authenticated WITH CHECK (true);

INSERT INTO public.legal_policies (ref_code, name, policy_type, status, version, last_updated, updated_by, compliance_score) VALUES
('POL-001','Terms of Service','terms','published','3.2.1','2024-01-10','LM-A1B2',98),
('POL-002','Privacy Policy','privacy','pending_approval','2.5.0','2024-01-14','LM-A1B2',95),
('POL-003','Refund Policy','refund','published','1.8.3','2024-01-05','LM-C3D4',100),
('POL-004','Acceptable Use Policy','aup','draft','2.0.0-draft','2024-01-15','LM-A1B2',88);

INSERT INTO public.legal_documents (ref_code, name, doc_type, uploaded_at, uploaded_by, size_label, encrypted, access_level, expiry_date) VALUES
('DOC-001','Master Service Agreement - Template','agreement','2024-01-10','LM-A1B2','245 KB',true,'legal_admin',NULL),
('DOC-002','Partner License Agreement v3','license','2024-01-08','LM-C3D4','189 KB',true,'legal_only',NULL),
('DOC-003','GDPR Compliance Report Q4','compliance','2024-01-05','LM-A1B2','1.2 MB',true,'legal_admin',NULL),
('DOC-004','Trademark Registration Certificate','legal_notice','2024-01-02','LM-A1B2','512 KB',true,'legal_admin','2034-06-15');

INSERT INTO public.legal_alerts (ref_code, alert_type, severity, title, description, detected_in, confidence, detected_at, status, ai_suggestion) VALUES
('LA-001','fraud_language','high','Suspicious guarantee claims detected','Partner page contains "100% guaranteed returns" language','Partner: RSL-4521',92,'2024-01-15T09:30:00Z','pending','Recommend issuing warning and requiring content revision within 48 hours'),
('LA-002','copyright_misuse','critical','Unauthorized logo usage','Third-party demo using brand logo without license','Demo: DM-7823',98,'2024-01-15T08:15:00Z','pending','Recommend immediate takedown notice and suspension review'),
('LA-003','scam_pattern','medium','Unusual referral pattern detected','Referral chain shows characteristics of pyramid structure','User: USR-9912',76,'2024-01-14T18:45:00Z','reviewed','Monitor for 7 days and collect additional evidence'),
('LA-004','policy_breach','high','Data retention policy breach','Customer records retained beyond agreed retention window','Franchise: FRN-2201',89,'2024-01-14T12:05:00Z','escalated','Escalate to Admin and trigger data purge workflow');

INSERT INTO public.legal_violations (ref_code, violator_type, violator_id, violation_type, severity, description, evidence, detected_at, status, previous_violations) VALUES
('VIO-001','partner','RSL-4521','Misleading Claims','serious','Partner advertising guaranteed returns without proper disclaimers',ARRAY['Screenshot of marketing page','Customer complaint #CC-881'],'2024-01-15T09:00:00Z','pending',1),
('VIO-002','user','USR-7823','Content Policy Breach','warning','User uploaded content violating acceptable use policy',ARRAY['Content ID CNT-3391'],'2024-01-14T15:20:00Z','warned',0),
('VIO-003','franchise','FRN-2201','Brand Misuse','critical','Franchise using modified brand assets across public campaigns',ARRAY['Campaign asset pack','Field audit report FA-114'],'2024-01-13T11:40:00Z','escalated',2),
('VIO-004','reseller','RSL-3390','Unauthorised Discounting','warning','Reseller offering pricing below contractual floor',ARRAY['Price list screenshot'],'2024-01-12T10:05:00Z','resolved',0);

INSERT INTO public.legal_trademark_assets (ref_code, name, asset_type, registration_number, status, expiry_date, violations) VALUES
('TM-001','Primary Logo','logo','TM-2024-001234','protected','2034-06-15',2),
('TM-002','Brand Name','brand_name','TM-2024-001235','protected','2034-06-15',0),
('TM-003','Tagline','slogan','TM-2024-001236','pending','-',1);

INSERT INTO public.legal_misuse_alerts (ref_code, asset_ref, asset_name, detected_in, severity, description, ai_confidence, detected_at) VALUES
('MU-001','TM-001','Primary Logo','Partner Page: RSL-4521','high','Logo used without proper license attribution',94,'2024-01-15T08:00:00Z'),
('MU-002','TM-001','Primary Logo','Demo: DM-7823','medium','Modified logo version detected',87,'2024-01-14T16:30:00Z'),
('MU-003','TM-003','Tagline','Content: CNT-1122','low','Similar tagline usage in marketing material',72,'2024-01-14T14:00:00Z');

INSERT INTO public.legal_logs (ref_code, action, category, actor, details, logged_at) VALUES
('LOG-001','Policy Draft Saved','policy','LM-A1B2','Updated Privacy Policy draft v2.5.0','2024-01-15T10:30:00Z'),
('LOG-002','AI Flag Reviewed','ai_flag','LM-A1B2','Reviewed fraud language alert LA-001','2024-01-15T10:15:00Z'),
('LOG-003','Violation Escalated','escalation','LM-C3D4','Escalated VIO-003 to Super Admin','2024-01-15T09:45:00Z'),
('LOG-004','Trademark Misuse Detected','trademark','AI-SYSTEM','AI detected logo misuse in Demo DM-7823','2024-01-15T09:30:00Z'),
('LOG-005','Document Uploaded','document','LM-A1B2','Uploaded Master Service Agreement template','2024-01-15T09:00:00Z'),
('LOG-006','Warning Issued','violation','LM-A1B2','Issued warning to USR-7823 for content policy breach','2024-01-14T17:30:00Z'),
('LOG-007','Policy Submitted','policy','LM-C3D4','Submitted AUP draft for Admin approval','2024-01-14T16:00:00Z'),
('LOG-008','Suspension Recommended','violation','LM-A1B2','Recommended suspension for RSL-4521 (pending Admin)','2024-01-14T14:30:00Z');

INSERT INTO public.legal_records (category, ref_code, name, record_type, status, position, details) VALUES
('agreement','AGR-001','End User Agreement v4.2','User','active',1,'{"updated":"2 hours ago"}'),
('agreement','AGR-002','Franchise Agreement - India','Franchise','pending',2,'{"updated":"5 hours ago"}'),
('agreement','AGR-003','Developer NDA Template','Developer','active',3,'{"updated":"1 day ago"}'),
('agreement','AGR-004','Reseller Terms v3.0','Reseller','review',4,'{"updated":"2 days ago"}'),
('agreement','AGR-005','Admin Agreement','Admin','active',5,'{"updated":"3 days ago"}'),
('policy',NULL,'Privacy Policy','Privacy','active',1,'{"version":"v5.2","updated":"Jan 2025"}'),
('policy',NULL,'Terms & Conditions','Legal','active',2,'{"version":"v4.1","updated":"Dec 2024"}'),
('policy',NULL,'Refund Policy','Commercial','active',3,'{"version":"v2.3","updated":"Nov 2024"}'),
('policy',NULL,'Usage Policy','Usage','active',4,'{"version":"v3.0","updated":"Jan 2025"}'),
('policy',NULL,'AI Usage Policy','AI/ML','active',5,'{"version":"v1.5","updated":"Jan 2025"}'),
('policy',NULL,'Data Retention Policy','Data','active',6,'{"version":"v2.1","updated":"Dec 2024"}'),
('agreement_engine',NULL,'Standard Agreement Generator','General','active',1,'{"aiScore":98}'),
('agreement_engine',NULL,'Product Agreement AI','Product','active',2,'{"aiScore":95}'),
('agreement_engine',NULL,'Role-Based Generator','Role','active',3,'{"aiScore":97}'),
('agreement_engine',NULL,'Country Compliance AI','Country','processing',4,'{"aiScore":92}'),
('agreement_engine',NULL,'Language Detection Engine','Language','active',5,'{"aiScore":99}'),
('trademark',NULL,'Brand Name Protection','Trademark','registered',1,'{"region":"Global","expiry":"2035"}'),
('trademark',NULL,'Logo Usage Policy','Policy','active',2,'{"region":"Global","expiry":"N/A"}'),
('trademark',NULL,'Trademark Registration Status','Registry','registered',3,'{"region":"Multi-Region","expiry":"2030"}'),
('trademark',NULL,'Unauthorized Usage Alerts','Monitoring','active',4,'{"region":"Global","expiry":"Ongoing"}'),
('trademark',NULL,'Auto Legal Notice Generator','AI Tool','active',5,'{"region":"Global","expiry":"N/A"}'),
('copyright',NULL,'Software Copyright Declaration','Software','registered',1,'{"year":"2025","protection":"Full"}'),
('copyright',NULL,'Code Ownership Declaration','Source Code','registered',2,'{"year":"2025","protection":"Full"}'),
('copyright',NULL,'Asset Ownership','Digital Assets','registered',3,'{"year":"2024","protection":"Full"}'),
('copyright',NULL,'Auto Copyright Notice','Auto-Generated','active',4,'{"year":"2025","protection":"Auto"}'),
('copyright',NULL,'Violation Detection System','AI Monitoring','active',5,'{"year":"2025","protection":"Active"}'),
('copyright',NULL,'Legal Action Log','Records','maintained',6,'{"year":"2024-2025","protection":"Documented"}'),
('brand_ip',NULL,'Brand Agreement','Agreement','active',1,'{"coverage":"Global","enforcement":"Strict"}'),
('brand_ip',NULL,'White-Label Restrictions','Policy','active',2,'{"coverage":"Global","enforcement":"Mandatory"}'),
('brand_ip',NULL,'Reseller Brand Rules','Guidelines','active',3,'{"coverage":"All Resellers","enforcement":"Required"}'),
('brand_ip',NULL,'Franchise Brand Usage','Guidelines','active',4,'{"coverage":"All Franchises","enforcement":"Mandatory"}'),
('brand_ip',NULL,'IP Abuse Monitoring','AI Monitoring','active',5,'{"coverage":"Global","enforcement":"Auto-Detection"}'),
('approval',NULL,'AI Draft Review Queue','AI → Human','pending',1,'{"count":12,"priority":"High"}'),
('approval',NULL,'Manager Approval Pending','Manager Review','pending',2,'{"count":8,"priority":"Medium"}'),
('approval',NULL,'Boss Override Requests','Executive','pending',3,'{"count":2,"priority":"Critical"}'),
('approval',NULL,'Locked Agreements','Locked','locked',4,'{"count":45,"priority":"N/A"}'),
('approval',NULL,'Published Agreements','Published','active',5,'{"count":189,"priority":"N/A"}'),
('audit',NULL,'User Accepted Agreement','Acceptance','success',1,'{"user":"john.doe@email.com","timestamp":"2 mins ago"}'),
('audit',NULL,'Agreement Version Updated','Version','info',2,'{"user":"legal.admin","timestamp":"15 mins ago"}'),
('audit',NULL,'Policy Change Published','Policy','success',3,'{"user":"legal.manager","timestamp":"1 hour ago"}'),
('audit',NULL,'Compliance Check Passed','Compliance','success',4,'{"user":"system","timestamp":"2 hours ago"}'),
('audit',NULL,'Agreement Rejected','Rejection','warning',5,'{"user":"user123","timestamp":"3 hours ago"}'),
('audit',NULL,'Export for Audit Generated','Export','info',6,'{"user":"legal.admin","timestamp":"1 day ago"}'),
('international_law',NULL,'GDPR','Regulation','compliant',1,'{"region":"EU","coverage":"100%","lastAudit":"Jan 2025"}'),
('international_law',NULL,'CCPA','Regulation','compliant',2,'{"region":"California, USA","coverage":"100%","lastAudit":"Dec 2024"}'),
('international_law',NULL,'IT Act (India)','Regulation','compliant',3,'{"region":"India","coverage":"98%","lastAudit":"Nov 2024"}'),
('international_law',NULL,'DMCA','Regulation','compliant',4,'{"region":"USA","coverage":"100%","lastAudit":"Dec 2024"}'),
('international_law',NULL,'Consumer Protection','Regulation','review',5,'{"region":"Global","coverage":"95%","lastAudit":"Oct 2024"}'),
('international_law',NULL,'Data Privacy Regulations','Regulation','compliant',6,'{"region":"Global","coverage":"97%","lastAudit":"Jan 2025"}'),
('international_law',NULL,'Country-Specific Overrides','Override','active',7,'{"region":"Multi-Region","coverage":"92%","lastAudit":"Jan 2025"}'),
('product_binding',NULL,'CRM Pro','Enterprise License','bound',1,'{"product":"CRM Pro","agreement":"Enterprise License","mandatory":true,"expiry":"Dec 2025"}'),
('product_binding',NULL,'HR Suite','Standard License','bound',2,'{"product":"HR Suite","agreement":"Standard License","mandatory":true,"expiry":"Jan 2026"}'),
('product_binding',NULL,'Finance Module','Premium License','pending',3,'{"product":"Finance Module","agreement":"Premium License","mandatory":true,"expiry":"Mar 2025"}'),
('product_binding',NULL,'Analytics Dashboard','Basic License','bound',4,'{"product":"Analytics Dashboard","agreement":"Basic License","mandatory":false,"expiry":"Jun 2025"}'),
('product_binding',NULL,'Mobile App','Mobile Terms','review',5,'{"product":"Mobile App","agreement":"Mobile Terms","mandatory":true,"expiry":"Feb 2025"}'),
('role_agreement',NULL,'End User Agreement','User','active',1,'{"role":"User","version":"v4.2","acceptances":12450}'),
('role_agreement',NULL,'Admin Agreement','Admin','active',2,'{"role":"Admin","version":"v2.1","acceptances":156}'),
('role_agreement',NULL,'Reseller Agreement','Reseller','active',3,'{"role":"Reseller","version":"v3.0","acceptances":89}'),
('role_agreement',NULL,'Franchise Agreement','Franchise','pending',4,'{"role":"Franchise","version":"v2.5","acceptances":45}'),
('role_agreement',NULL,'Developer Agreement','Developer','active',5,'{"role":"Developer","version":"v1.8","acceptances":234}'),
('role_agreement',NULL,'Employee Agreement','Employee','active',6,'{"role":"Employee","version":"v3.2","acceptances":78}'),
('role_agreement',NULL,'Partner Agreement','Partner','review',7,'{"role":"Partner","version":"v1.5","acceptances":23}'),
('login_gate',NULL,'Agreement Review Screen','Display','enabled',1,'{"enforcement":"Mandatory"}'),
('login_gate',NULL,'Scroll-to-End Enforcement','UX','enabled',2,'{"enforcement":"Strict"}'),
('login_gate',NULL,'Mandatory Accept Checkbox','Input','enabled',3,'{"enforcement":"Required"}'),
('login_gate',NULL,'Accept & Continue Flow','Action','enabled',4,'{"enforcement":"Mandatory"}'),
('login_gate',NULL,'Reject → Logout Flow','Action','enabled',5,'{"enforcement":"Strict"}'),
('login_gate',NULL,'Re-Accept on Update','Trigger','enabled',6,'{"enforcement":"Auto"}'),
('notification',NULL,'Agreement Expiry Alert','expiry','high',1,'{"message":"Franchise Agreement expires in 30 days","time":"5 mins ago","priority":"high"}'),
('notification',NULL,'Policy Violation Detected','violation','critical',2,'{"message":"User xyz violated usage policy","time":"15 mins ago","priority":"critical"}'),
('notification',NULL,'Pending Acceptance','pending','medium',3,'{"message":"15 users haven''t accepted new terms","time":"1 hour ago","priority":"medium"}'),
('notification',NULL,'Policy Update Published','update','info',4,'{"message":"Privacy Policy v5.3 is now live","time":"2 hours ago","priority":"info"}'),
('notification',NULL,'Agreement Expiry Alert','expiry','high',5,'{"message":"Developer NDA expires in 7 days","time":"3 hours ago","priority":"high"}'),
('ai_feature',NULL,'Auto Draft Agreements','Generation','active',1,'{"accuracy":"98%","uses":1245}'),
('ai_feature',NULL,'Auto Risk Detection','Analysis','active',2,'{"accuracy":"96%","uses":892}'),
('ai_feature',NULL,'Auto Compliance Check','Compliance','active',3,'{"accuracy":"99%","uses":2103}'),
('ai_feature',NULL,'Auto Legal Notice Generator','Generation','active',4,'{"accuracy":"97%","uses":341}'),
('ai_feature',NULL,'Multi-Language Legal Engine','Translation','active',5,'{"accuracy":"95%","uses":768}'),
('setting',NULL,'Legal Profile','Profile','configured',1,'{"description":"Manage your legal manager profile"}'),
('setting',NULL,'Notification Rules','Notifications','configured',2,'{"description":"Configure alert and notification settings"}'),
('setting',NULL,'Security Settings','Security','active',3,'{"description":"Two-factor authentication and access controls"}');