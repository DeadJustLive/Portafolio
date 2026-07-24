# OPL Project: Portafolio

Este proyecto usa OPL Studio. Sigue estas reglas:

1. Al iniciar, lee .opl/config.json y .opl/DISCOVERY.md
2. Conectate al servidor MCP de OPL (tools disponibles en .opencode/mcp.json)
3. Sigue el workflow definido en .opl/workflow.json
4. Usa "opl commit" para commits estructurados
5. Respeta los contratos (@contract) y dependencias (@deps) en el codigo

## Pipeline multi-agente

Si hay un archivo .opl/harness.json, sigue el pipeline definido alli.
Usa get_context para leer el estado actual del proyecto y el pipeline activo.

Cuando recibas una tarea:
1. Lee context.md con get_context
2. Sigue el pipeline: genera plan con write_knowledge, implementa con mutate_ast, revisa con validate/report_error
3. Usa "opl commit" al finalizar

Cuando el usuario diga "usemos OPL":
  - Verifica la fase actual en .opl/config.json
  - Si no hay sesion activa, inicia una con "opl session start"
  - Trabaja los tickets segun el workflow
