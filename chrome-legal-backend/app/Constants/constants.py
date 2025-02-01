import tempfile
TUNNEL_LIMIT = 20
SYSTEM_NAME_FILE = tempfile.gettempdir() + "/exposed_system.txt"
TUNNELS_NAME_PATH = tempfile.gettempdir() + "/tunnels.txt"
GLOBAL_BACKEND_URL = "http://localhost:3756"
headers = {
    "api-key": "123",
    "type": "READ_AND_WRITE_ACCESS"
}
# S3 Bucket
REGION_NAME="auto"
ENDPOINT_URL="https://537bd2539513650478e73dedc625a962.r2.cloudflarestorage.com/gpulab"
AWS_ACCESS_KEY_ID="65f0ea0b2477290623af0751d22f13ac"
AWS_SECRET_ACCESS_KEY="4ef3873919ca55fa858d2870ff08f73a30212e6f0bdbfd352675ec7e55763758"
IMAGE_DIRECTORY="assets"
TOKEN_SECRET_KEY = 'mysecretkey'

# Stripe
STRIPE_API_KEY="sk_test_51NXS0ODtPHDtySp5VElsdUujaeG4GkhPSaY8qstvbKvNpnOwduEwQfDkYhLRNgCTUQkM1spLAokV1LDaR9tEd80I004GqGyWFI"

# Redis
REDIS_CLIENT_URL='localhost'
REDIS_CLIENT_PORT='6379'

# Moosefs
MOOSEFS_DISK_SOURCE='mfs'

# Docker
DOCKER_ENGINE_API_VERSION='v1.45'

# Cloudflare
CLOUDFLARE_URL="https://api.cloudflare.com/client/v4"
CLOUDFLARE_ACCOUNT_ID="4fff8470d27f2c851dbc71655c5de440"
CLOUDFLARE_EMAIL="adhik@modelslab.com"
CLOUDFLARE_KEY="f99c3906955e230f554b998fff61791a7eadc"
DOCKER_ENGINE_API_VERSION='v1.45'

# NAS Server API Link
NAS_LINK="https://system-049b864777144a5.gpulab.dev"
NAS_IP="10.42.0.14"