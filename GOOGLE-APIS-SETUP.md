# Google APIs Setup untuk Opencode

## Kredensial
- File: /root/.config/gcloud/application_default_credentials.json
- Service Account: opencode-agent@my-site-509023.iam.gserviceaccount.com
- Project: my-site-509023

## Layanan yang Aktif
- Search Console: sc-domain:eduglossary.my.id
- GA4: properti eduglossary (ID: 557073527)

## Env Vars
export GOOGLE_APPLICATION_CREDENTIALS="/root/.config/gcloud/application_default_credentials.json"
export GOOGLE_CLOUD_PROJECT="my-site-509023"
export GA4_PROPERTY_ID="557073527"
export SEARCH_CONSOLE_SITE="sc-domain:eduglossary.my.id"

## Refresh Kredensial (kalau expired)
gcloud auth application-default login \
  --impersonate-service-account=opencode-agent@my-site-509023.iam.gserviceaccount.com \
  --scopes="https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/webmasters,https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/analytics"

## Test
python3 /tmp/test-google-apis.py
