export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      legal_alerts: {
        Row: {
          ai_suggestion: string
          alert_type: string
          confidence: number
          created_at: string
          description: string
          detected_at: string
          detected_in: string
          id: string
          ref_code: string
          severity: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          ai_suggestion?: string
          alert_type: string
          confidence?: number
          created_at?: string
          description: string
          detected_at?: string
          detected_in: string
          id?: string
          ref_code: string
          severity: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          ai_suggestion?: string
          alert_type?: string
          confidence?: number
          created_at?: string
          description?: string
          detected_at?: string
          detected_in?: string
          id?: string
          ref_code?: string
          severity?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      legal_documents: {
        Row: {
          access_level: string
          created_at: string
          doc_type: string
          encrypted: boolean
          expiry_date: string | null
          id: string
          name: string
          ref_code: string
          size_label: string
          storage_path: string | null
          updated_at: string
          uploaded_at: string
          uploaded_by: string
        }
        Insert: {
          access_level?: string
          created_at?: string
          doc_type: string
          encrypted?: boolean
          expiry_date?: string | null
          id?: string
          name: string
          ref_code: string
          size_label?: string
          storage_path?: string | null
          updated_at?: string
          uploaded_at?: string
          uploaded_by?: string
        }
        Update: {
          access_level?: string
          created_at?: string
          doc_type?: string
          encrypted?: boolean
          expiry_date?: string | null
          id?: string
          name?: string
          ref_code?: string
          size_label?: string
          storage_path?: string | null
          updated_at?: string
          uploaded_at?: string
          uploaded_by?: string
        }
        Relationships: []
      }
      legal_logs: {
        Row: {
          action: string
          actor: string
          category: string
          created_at: string
          details: string
          id: string
          immutable: boolean
          logged_at: string
          ref_code: string
        }
        Insert: {
          action: string
          actor: string
          category: string
          created_at?: string
          details: string
          id?: string
          immutable?: boolean
          logged_at?: string
          ref_code: string
        }
        Update: {
          action?: string
          actor?: string
          category?: string
          created_at?: string
          details?: string
          id?: string
          immutable?: boolean
          logged_at?: string
          ref_code?: string
        }
        Relationships: []
      }
      legal_misuse_alerts: {
        Row: {
          ai_confidence: number
          asset_name: string
          asset_ref: string
          created_at: string
          description: string
          detected_at: string
          detected_in: string
          id: string
          ref_code: string
          severity: string
          updated_at: string
        }
        Insert: {
          ai_confidence?: number
          asset_name: string
          asset_ref: string
          created_at?: string
          description: string
          detected_at?: string
          detected_in: string
          id?: string
          ref_code: string
          severity: string
          updated_at?: string
        }
        Update: {
          ai_confidence?: number
          asset_name?: string
          asset_ref?: string
          created_at?: string
          description?: string
          detected_at?: string
          detected_in?: string
          id?: string
          ref_code?: string
          severity?: string
          updated_at?: string
        }
        Relationships: []
      }
      legal_policies: {
        Row: {
          compliance_score: number
          content: string | null
          created_at: string
          id: string
          last_updated: string
          name: string
          policy_type: string
          ref_code: string
          status: string
          updated_at: string
          updated_by: string
          version: string
        }
        Insert: {
          compliance_score?: number
          content?: string | null
          created_at?: string
          id?: string
          last_updated?: string
          name: string
          policy_type: string
          ref_code: string
          status?: string
          updated_at?: string
          updated_by: string
          version: string
        }
        Update: {
          compliance_score?: number
          content?: string | null
          created_at?: string
          id?: string
          last_updated?: string
          name?: string
          policy_type?: string
          ref_code?: string
          status?: string
          updated_at?: string
          updated_by?: string
          version?: string
        }
        Relationships: []
      }
      legal_records: {
        Row: {
          category: string
          created_at: string
          details: Json
          id: string
          name: string
          position: number
          record_type: string | null
          ref_code: string | null
          status: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          details?: Json
          id?: string
          name: string
          position?: number
          record_type?: string | null
          ref_code?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          details?: Json
          id?: string
          name?: string
          position?: number
          record_type?: string | null
          ref_code?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      legal_trademark_assets: {
        Row: {
          asset_type: string
          created_at: string
          expiry_date: string
          id: string
          name: string
          ref_code: string
          registration_number: string
          status: string
          updated_at: string
          violations: number
        }
        Insert: {
          asset_type: string
          created_at?: string
          expiry_date?: string
          id?: string
          name: string
          ref_code: string
          registration_number: string
          status?: string
          updated_at?: string
          violations?: number
        }
        Update: {
          asset_type?: string
          created_at?: string
          expiry_date?: string
          id?: string
          name?: string
          ref_code?: string
          registration_number?: string
          status?: string
          updated_at?: string
          violations?: number
        }
        Relationships: []
      }
      legal_violations: {
        Row: {
          action_notes: string | null
          created_at: string
          description: string
          detected_at: string
          evidence: string[]
          id: string
          previous_violations: number
          ref_code: string
          severity: string
          status: string
          updated_at: string
          violation_type: string
          violator_id: string
          violator_type: string
        }
        Insert: {
          action_notes?: string | null
          created_at?: string
          description: string
          detected_at?: string
          evidence?: string[]
          id?: string
          previous_violations?: number
          ref_code: string
          severity: string
          status?: string
          updated_at?: string
          violation_type: string
          violator_id: string
          violator_type: string
        }
        Update: {
          action_notes?: string | null
          created_at?: string
          description?: string
          detected_at?: string
          evidence?: string[]
          id?: string
          previous_violations?: number
          ref_code?: string
          severity?: string
          status?: string
          updated_at?: string
          violation_type?: string
          violator_id?: string
          violator_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
