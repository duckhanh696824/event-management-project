export interface CertifiedEvent {
  id: number;
  event_id: number;
  title: string;
  event_type_id: number;
  start_time: string;
  site: string;
  image_base64: string | null;
  certificate_template_id: number | null;
  nickname: string;
  username: string;
  class: string;
  cert_number: number;
  template: {
    background_base64: string;               
    field_positions_json: Record<string, { x: number; y: number }>;
    display_width: number;
    display_height: number;
  };
}