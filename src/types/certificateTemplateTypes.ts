export type FieldStyle = {
  checked?: boolean;
  x: number;
  y: number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  fontSize?: number;
};

type FieldPositions = {
  [key: string]: FieldStyle;
};

export interface CertificateTemplate {
  id: string;
  name: string;
  event_type_id: string;
  event_type?: {
    id: string;
    name: string;
  };
  background_base64: string;
  field_positions: {
    name?: FieldStyle;
    id?: FieldStyle;
    unit?: FieldStyle;
    program?: FieldStyle;
    day?: FieldStyle;
    month?: FieldStyle;
    year?: FieldStyle;
    cert_number?: FieldStyle;
  };
  display_width?: number;
  display_height?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCertificateTemplatePayload {
  name: string;
  event_type_id: string;
  background_base64?: string;
  field_positions?: {
    name?: FieldStyle;
    id?: FieldStyle;
    unit?: FieldStyle;
    program?: FieldStyle;
    day?: FieldStyle;
    month?: FieldStyle;
    year?: FieldStyle;
    cert_number?: FieldStyle;
  };
  display_width?: number;
  display_height?: number;
}

export interface CertificateTemplate_Update {
  id: string;
  name: string;
  event_type_id: string;
  event_type?: {
    id: string;
    name: string;
  };
  background_base64: string;
  field_positions: FieldPositions;
  display_width?: number;
  display_height?: number;
  created_at?: string;
  updated_at?: string;
}
