export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      campaign_tags: {
        Row: {
          campaign_id: number
          created_at: string
          id: number
          tag: string
          updated_at: string
        }
        Insert: {
          campaign_id: number
          created_at?: string
          id?: never
          tag: string
          updated_at: string
        }
        Update: {
          campaign_id?: number
          created_at?: string
          id?: never
          tag?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_tags_campaign_id_campaigns_id_fk"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          public_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: never
          name: string
          public_id: string
          updated_at: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: never
          name?: string
          public_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_topics: {
        Row: {
          confidence_score: number
          id: string
          lead_id: string
          topic: string
        }
        Insert: {
          confidence_score: number
          id?: string
          lead_id: string
          topic: string
        }
        Update: {
          confidence_score?: number
          id?: string
          lead_id?: string
          topic?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_topics_lead_id_leads_id_fk"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          campaign_id: number
          confidence_score_threshold: number
          created_at: string
          id: string
          post_author: string
          post_content: string | null
          post_created_at: string
          post_is_nsfw: boolean | null
          post_source: Database["public"]["Enums"]["social_media_source"]
          post_title: string
          post_url: string
          user_id: string
        }
        Insert: {
          campaign_id: number
          confidence_score_threshold: number
          created_at?: string
          id?: string
          post_author: string
          post_content?: string | null
          post_created_at: string
          post_is_nsfw?: boolean | null
          post_source: Database["public"]["Enums"]["social_media_source"]
          post_title: string
          post_url: string
          user_id: string
        }
        Update: {
          campaign_id?: number
          confidence_score_threshold?: number
          created_at?: string
          id?: string
          post_author?: string
          post_content?: string | null
          post_created_at?: string
          post_is_nsfw?: boolean | null
          post_source?: Database["public"]["Enums"]["social_media_source"]
          post_title?: string
          post_url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_campaign_id_campaigns_id_fk"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tag_suggestions: {
        Row: {
          created_at: string
          id: number
          tag: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: never
          tag: string
          updated_at: string
        }
        Update: {
          created_at?: string
          id?: never
          tag?: string
          updated_at?: string
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
      social_media_source: "reddit"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
