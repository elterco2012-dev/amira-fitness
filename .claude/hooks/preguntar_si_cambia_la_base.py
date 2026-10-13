"""Control antes de que Claude toque la base de Supabase (hook PreToolUse de .claude/settings.json).

- Consultas que solo leen: siguen sin preguntar (están permitidas en settings.json).
- SQL que cambia o borra datos, cambios de estructura o de permisos y publicar
  funciones del servidor: sale el cartel de permiso con la explicación, para que decida Aaron.
- Ante la duda, pregunta.
"""
import json
import re
import sys


def preguntar(motivo):
    print(json.dumps({'hookSpecificOutput': {
        'hookEventName': 'PreToolUse',
        'permissionDecision': 'ask',
        'permissionDecisionReason': motivo + ' Aceptá solo si Claude te explicó antes qué va a cambiar y estás de acuerdo.',
    }}, ensure_ascii=False))
    sys.exit(0)


try:
    datos = json.load(sys.stdin)
except Exception:
    preguntar('No se pudo revisar qué va a hacer en la base.')

herramienta = str(datos.get('tool_name', ''))
if herramienta.endswith('__apply_migration'):
    preguntar('Esto cambia la estructura o los permisos de la base de datos.')
if herramienta.endswith('__deploy_edge_function'):
    preguntar('Esto publica una función del servidor (avisos, resumen del domingo o rutinas con IA).')
if not herramienta.endswith('__execute_sql'):
    sys.exit(0)

sql =str((datos.get('tool_input') or {}).get('query', '')).lower()

CAMBIA = re.compile(
    # Órdenes que escriben, borran o cambian estructura y permisos
    r'\b(insert|update|delete|merge|upsert|drop|alter|truncate|create|grant|revoke|comment|copy|call|do'
    r'|set|reset|into|refresh|vacuum|reindex|cluster|lock|notify|execute|import)\b'
    # Funciones que hacen algo además de leer: tareas programadas, pedidos a internet, claves guardadas
    r'|\b(cron|net|pg_net|vault|dblink|supabase_functions)\s*\.'
    r'|\b(pg_terminate_backend|pg_cancel_backend|pg_reload_conf|set_config|setval|nextval'
    r'|lo_\w+|pg_read\w*|pg_ls\w*|pg_stat_reset\w*)\b'
    # Funciones de la app que guardan o borran (guardar_suscripcion, ficha_guardar...)
    r'|\b\w*(guardar|borrar|eliminar|actualizar|insertar|limpiar)\w*\s*\('
)

if not sql.strip() or CAMBIA.search(sql):
    preguntar('Este SQL puede cambiar o borrar datos de la base de Amira Fitness.')
