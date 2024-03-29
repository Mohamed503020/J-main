export interface UserDto{
    id: number
    id_number: string
    by_account_id: number
    name: string
    email: string
    notify_email: any
    mobile: string
    w_mobile: string
    w_country_iso: string
    email_verified_at: string
    country_iso: string
    account_type: number
    company_name: string
    company_field_id: number
    is_developer: number
    currency_id: number
    country_id: number
    city_id: number
    is_marketer: number
    sms_fees: number
    otp_sms_fees: number
    salla_sms_fees: number
    status: number
    active_sms_verify: number
    active_email_verify: number
    active_google_verify: number
    auth_secret: string
    ips: any[]
    accept_agreement_at: string
    accept_agreement_ip: string
    account_id: any
    odoo_id: string
    fb_id: any
    google_id: any
    zoho_id: any
    theme_id: any
    filter_group_id: any
    pricing_policy_id: any
    sending_center_id: any
    remember_token: any
    source: string
    site_user_id: any
    site_username: any
    site_groupid: any
    site_createdby: any
    telegram_username: string
    telegram_id: any
    telegram_code: string
    pusher_key: string
    connected_site_username: any
    is_transfer: number
    last_login: string
    transfer_package_allowed: number
    min_transfer_points: number
    add_sub_account_allowed: number
    min_sub_accounts: number
    daftra_id: any
    created_at: string
    updated_at: string
    stripe_id: string
    card_brand: any
    card_last_four: any
    trial_ends_at: any
    transfer_balance_allowed: number
    is_first_login: boolean
    is_first_login_after_transfer: boolean
    marketer: any
    account_unified_numbers: AccountUnifiedNumber[]
    senders_active: number
    senders_expired: number
    current_sub_accounts: number
  }
  
  export interface AccountUnifiedNumber {
    uuid: string
    account_id: number
    unified_number: string
    created_at: any
    updated_at: any
  }