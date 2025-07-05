```
stateDiagram-v2
    [*] --> Digitando
    Digitando --> Enviando : Usuário clica em "Enviar"
    Enviando --> EnviadaParaAPI : Requisição para WhatsApp API
    EnviadaParaAPI --> Confirmada : WhatsApp retorna sucesso
    EnviadaParaAPI --> Falha : WhatsApp retorna erro
    Confirmada --> Armazenada : Backend salva no banco de dados
    Armazenada --> [*]

    Falha --> [*]

    [*] --> RecebidaViaWebhook : Contato envia mensagem
    RecebidaViaWebhook --> Armazenada : Mensagem salva no banco
```

## Explicação dos estados:

Digitando: Estado local da UI, antes do envio.

Enviando: Mensagem está a caminho da API.

Confirmada: WhatsApp confirmou o recebimento.

Armazenada: A mensagem foi persistida no banco.

RecebidaViaWebhook: Mensagem vinda do contato por webhook.
