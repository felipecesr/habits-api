```
erDiagram
    USER ||--o{ CONVERSATION : has
    CONTACT ||--o{ CONVERSATION : has
    CONVERSATION ||--o{ MESSAGE : includes

    USER {
        string id PK
        string name
        string email
        string whatsapp_number "número oficial do sistema usado como remetente"
    }

    CONTACT {
        string id PK
        string name
        string whatsapp_number
    }

    CONVERSATION {
        string id PK
        string user_id FK
        string contact_id FK
        datetime created_at
    }

    MESSAGE {
        string id PK
        string conversation_id FK
        enum sender_type "user | contact"
        text content
        datetime sent_at
        boolean delivered
    }
```
## Vantagens e desvantagens de criar a tabela conversation

Vantagens:
Abstrai bem o relacionamento lógico entre user e contact.

Permite evoluir o sistema com:

múltiplas conversas (histórico separado por tópicos)

status da conversa (aberta, arquivada, bloqueada etc)

performance: busca de mensagens por conversa é direta

Mantém o domínio mais organizado e expressivo.

Desvantagens:
Adiciona uma tabela a mais e requer um relacionamento adicional.

💡 Recomendações
Se você tem certeza absoluta de que:

Só haverá uma conversa entre cada usuário e contato.

Não haverá metadados por conversa.

O sistema é pequeno e não precisa escalar esse modelo.

👉 Pode manter tudo na tabela MESSAGE.

Mas se você quiser:

Ter um modelo mais robusto e alinhado com boas práticas.

Crescer no futuro com novas features (arquivamento, múltiplas conversas, estatísticas, etc).

👉 Use a tabela CONVERSATION. Ela te dá clareza, flexibilidade e consistência de domínio.

📌 Resumo
Critério	Sem CONVERSATION	Com CONVERSATION
Simplicidade inicial	✅ Simples	❌ Mais complexa
Escalabilidade futura	❌ Limitada	✅ Alta
Clareza semântica	❌ Menor	✅ Maior
Performance (com muitos dados)	❌ Pode degradar	✅ Melhor com índices
Boas práticas de modelagem	⚠️ Evitável	✅ Recomendado

Se estiver construindo algo com potencial de crescimento, minha recomendação é usar a tabela CONVERSATION desde o início. Isso evita refatorações caras depois.

Manter a tabela CONVERSATION te dá uma base sólida para evoluir o sistema com muito mais segurança e clareza no domínio. Aqui vão algumas ideias futuras que ficam bem mais simples com ela:

Arquivar ou silenciar conversas

Marcar como lida/nova

Trazer a última mensagem direto por conversa

Listar conversas ordenadas por data da última mensagem

Adicionar labels ou status por conversa

Suporte a múltiplas conversas por par usuário-contato

---

A adição do campo whatsapp_number na tabela USER:

Permite identificar quem é o destinatário da mensagem recebida via webhook ("to").

Garante que o mapeamento entre contato e conversa seja preciso.

Facilita filtros futuros, logs de envio por número, etc.

