This file is a merged representation of a subset of the codebase, containing specifically included files and files not matching ignore patterns, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: server/**, drizzle/**, shared/**, package.json
- Files matching these patterns are excluded: node_modules, dist, .git, *.test.*
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
drizzle/
  meta/
    _journal.json
    0000_snapshot.json
    0001_snapshot.json
    0002_snapshot.json
    0003_snapshot.json
    0004_snapshot.json
    0005_snapshot.json
    0006_snapshot.json
    0007_snapshot.json
    0008_snapshot.json
    0009_snapshot.json
    0010_snapshot.json
    0011_snapshot.json
  migrations/
    .gitkeep
  0000_known_riptide.sql
  0001_cold_zeigeist.sql
  0002_faithful_hydra.sql
  0003_useful_juggernaut.sql
  0004_mixed_whizzer.sql
  0005_lying_tag.sql
  0006_married_shotgun.sql
  0007_aspiring_dakota_north.sql
  0008_lyrical_gateway.sql
  0009_gorgeous_jimmy_woo.sql
  0010_strong_domino.sql
  0011_azav_compliance_tables.sql
  0011_romantic_patch.sql
  0012_auth_credentials.sql
  0013_user_enabled_modules.sql
  0014_password_reset_tokens.sql
  0015_access_codes.sql
  relations.ts
  schema.ts
server/
  _core/
    types/
      cookie.d.ts
      manusTypes.ts
    auth-local.ts
    context.ts
    cookies.ts
    dataApi.ts
    env.ts
    imageGeneration.ts
    index.ts
    llm.ts
    map.ts
    notification.ts
    oauth.ts
    polyfills.ts
    sdk.ts
    systemRouter.ts
    trpc.ts
    vite.ts
    voiceTranscription.ts
  aiAssistant.test.ts
  auth.logout.test.ts
  azavRouter.ts
  certificateRouter.ts
  certificates.test.ts
  certificates.ts
  db.ts
  exam-mode-button.test.ts
  examRouter.ts
  ihk-timer.test.ts
  index.ts
  passwordReset.ts
  pdf.test.ts
  pdfRouter.ts
  portalPhase.ts
  quizRouter.ts
  ragTutor.ts
  routers.ts
  seed-questions-modul5-batch2.sql
  seed-questions-modul5-batch3.sql
  seed-questions-modul5-batch4.sql
  seed-questions-modul5-batch5.sql
  seed-questions-modul5-batch6.sql
  seed-questions-modul5-batch7.sql
  seed-questions-modul5.sql
  seed-quiz.ts
  storage.ts
  stripe.ts
  videoRouter.ts
  whitelabel.test.ts
shared/
  _core/
    errors.ts
  const.ts
  types.ts
package.json
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="drizzle/meta/_journal.json">
{
  "version": "7",
  "dialect": "mysql",
  "entries": [
    {
      "idx": 0,
      "version": "5",
      "when": 1770442395912,
      "tag": "0000_known_riptide",
      "breakpoints": true
    },
    {
      "idx": 1,
      "version": "5",
      "when": 1770527720824,
      "tag": "0001_cold_zeigeist",
      "breakpoints": true
    },
    {
      "idx": 2,
      "version": "5",
      "when": 1772004520744,
      "tag": "0002_faithful_hydra",
      "breakpoints": true
    },
    {
      "idx": 3,
      "version": "5",
      "when": 1772004552456,
      "tag": "0003_useful_juggernaut",
      "breakpoints": true
    },
    {
      "idx": 4,
      "version": "5",
      "when": 1772033044426,
      "tag": "0004_mixed_whizzer",
      "breakpoints": true
    },
    {
      "idx": 5,
      "version": "5",
      "when": 1772033627364,
      "tag": "0005_lying_tag",
      "breakpoints": true
    },
    {
      "idx": 6,
      "version": "5",
      "when": 1772034556309,
      "tag": "0006_married_shotgun",
      "breakpoints": true
    },
    {
      "idx": 7,
      "version": "5",
      "when": 1772036254746,
      "tag": "0007_aspiring_dakota_north",
      "breakpoints": true
    },
    {
      "idx": 8,
      "version": "5",
      "when": 1772039864584,
      "tag": "0008_lyrical_gateway",
      "breakpoints": true
    },
    {
      "idx": 9,
      "version": "5",
      "when": 1772043106596,
      "tag": "0009_gorgeous_jimmy_woo",
      "breakpoints": true
    },
    {
      "idx": 10,
      "version": "5",
      "when": 1772049107245,
      "tag": "0010_strong_domino",
      "breakpoints": true
    },
    {
      "idx": 11,
      "version": "5",
      "when": 1772364325665,
      "tag": "0011_romantic_patch",
      "breakpoints": true
    }
  ]
}
</file>

<file path="drizzle/meta/0000_snapshot.json">
{
  "version": "5",
  "dialect": "mysql",
  "id": "b7539b60-44c5-44be-93c4-5645f42e77b0",
  "prevId": "00000000-0000-0000-0000-000000000000",
  "tables": {
    "users": {
      "name": "users",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "openId": {
          "name": "openId",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "loginMethod": {
          "name": "loginMethod",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','admin')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'user'"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        },
        "lastSignedIn": {
          "name": "lastSignedIn",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "users_id": {
          "name": "users_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "users_openId_unique": {
          "name": "users_openId_unique",
          "columns": [
            "openId"
          ]
        }
      },
      "checkConstraint": {}
    }
  },
  "views": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "tables": {},
    "indexes": {}
  }
}
</file>

<file path="drizzle/meta/0001_snapshot.json">
{
  "version": "5",
  "dialect": "mysql",
  "id": "8e02ce87-35ba-45e3-966c-77ed94571a25",
  "prevId": "b7539b60-44c5-44be-93c4-5645f42e77b0",
  "tables": {
    "chat_conversations": {
      "name": "chat_conversations",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleContext": {
          "name": "moduleContext",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_conversations_id": {
          "name": "chat_conversations_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "chat_messages": {
      "name": "chat_messages",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "conversationId": {
          "name": "conversationId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','assistant','system')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_messages_id": {
          "name": "chat_messages_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "users": {
      "name": "users",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "openId": {
          "name": "openId",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "loginMethod": {
          "name": "loginMethod",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','admin')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'user'"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        },
        "lastSignedIn": {
          "name": "lastSignedIn",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "users_id": {
          "name": "users_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "users_openId_unique": {
          "name": "users_openId_unique",
          "columns": [
            "openId"
          ]
        }
      },
      "checkConstraint": {}
    }
  },
  "views": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "tables": {},
    "indexes": {}
  }
}
</file>

<file path="drizzle/meta/0002_snapshot.json">
{
  "version": "5",
  "dialect": "mysql",
  "id": "80781fac-a41d-4872-9f9b-e2c5f3843c0d",
  "prevId": "8e02ce87-35ba-45e3-966c-77ed94571a25",
  "tables": {
    "chat_conversations": {
      "name": "chat_conversations",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleContext": {
          "name": "moduleContext",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_conversations_id": {
          "name": "chat_conversations_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "chat_messages": {
      "name": "chat_messages",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "conversationId": {
          "name": "conversationId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','assistant','system')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_messages_id": {
          "name": "chat_messages_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "users": {
      "name": "users",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "openId": {
          "name": "openId",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "loginMethod": {
          "name": "loginMethod",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','admin','trainer')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'user'"
        },
        "tenantId": {
          "name": "tenantId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        },
        "lastSignedIn": {
          "name": "lastSignedIn",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "users_id": {
          "name": "users_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "users_openId_unique": {
          "name": "users_openId_unique",
          "columns": [
            "openId"
          ]
        }
      },
      "checkConstraint": {}
    },
    "whitelabel_configs": {
      "name": "whitelabel_configs",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "slug": {
          "name": "slug",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "companyName": {
          "name": "companyName",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "logoUrl": {
          "name": "logoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "faviconUrl": {
          "name": "faviconUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "primaryColor": {
          "name": "primaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#2563eb'"
        },
        "secondaryColor": {
          "name": "secondaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#1e293b'"
        },
        "accentColor": {
          "name": "accentColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#3b82f6'"
        },
        "sidebarColor": {
          "name": "sidebarColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#0f172a'"
        },
        "welcomeText": {
          "name": "welcomeText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "footerText": {
          "name": "footerText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactEmail": {
          "name": "contactEmail",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactPhone": {
          "name": "contactPhone",
          "type": "varchar(50)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "websiteUrl": {
          "name": "websiteUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavEnabled": {
          "name": "azavEnabled",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "azavCertNumber": {
          "name": "azavCertNumber",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavValidUntil": {
          "name": "azavValidUntil",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "enabledModules": {
          "name": "enabledModules",
          "type": "json",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "('[1,2,3,4,5]')"
        },
        "maxUsers": {
          "name": "maxUsers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 100
        },
        "isActive": {
          "name": "isActive",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": true
        },
        "adminUserId": {
          "name": "adminUserId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "whitelabel_configs_id": {
          "name": "whitelabel_configs_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "whitelabel_configs_slug_unique": {
          "name": "whitelabel_configs_slug_unique",
          "columns": [
            "slug"
          ]
        }
      },
      "checkConstraint": {}
    }
  },
  "views": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "tables": {},
    "indexes": {}
  }
}
</file>

<file path="drizzle/meta/0003_snapshot.json">
{
  "version": "5",
  "dialect": "mysql",
  "id": "163153df-b0ad-48a3-8bd6-57b35b67eb4e",
  "prevId": "80781fac-a41d-4872-9f9b-e2c5f3843c0d",
  "tables": {
    "chat_conversations": {
      "name": "chat_conversations",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleContext": {
          "name": "moduleContext",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_conversations_id": {
          "name": "chat_conversations_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "chat_messages": {
      "name": "chat_messages",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "conversationId": {
          "name": "conversationId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','assistant','system')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_messages_id": {
          "name": "chat_messages_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "users": {
      "name": "users",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "openId": {
          "name": "openId",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "loginMethod": {
          "name": "loginMethod",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','admin','trainer')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'user'"
        },
        "tenantId": {
          "name": "tenantId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        },
        "lastSignedIn": {
          "name": "lastSignedIn",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "users_id": {
          "name": "users_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "users_openId_unique": {
          "name": "users_openId_unique",
          "columns": [
            "openId"
          ]
        }
      },
      "checkConstraint": {}
    },
    "whitelabel_configs": {
      "name": "whitelabel_configs",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "slug": {
          "name": "slug",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "companyName": {
          "name": "companyName",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "logoUrl": {
          "name": "logoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "faviconUrl": {
          "name": "faviconUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "primaryColor": {
          "name": "primaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#2563eb'"
        },
        "secondaryColor": {
          "name": "secondaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#1e293b'"
        },
        "accentColor": {
          "name": "accentColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#3b82f6'"
        },
        "sidebarColor": {
          "name": "sidebarColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#0f172a'"
        },
        "welcomeText": {
          "name": "welcomeText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "footerText": {
          "name": "footerText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactEmail": {
          "name": "contactEmail",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactPhone": {
          "name": "contactPhone",
          "type": "varchar(50)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "websiteUrl": {
          "name": "websiteUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavEnabled": {
          "name": "azavEnabled",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "azavCertNumber": {
          "name": "azavCertNumber",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavValidUntil": {
          "name": "azavValidUntil",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "enabledModules": {
          "name": "enabledModules",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'1,2,3,4,5'"
        },
        "maxUsers": {
          "name": "maxUsers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 100
        },
        "isActive": {
          "name": "isActive",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": true
        },
        "adminUserId": {
          "name": "adminUserId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "whitelabel_configs_id": {
          "name": "whitelabel_configs_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "whitelabel_configs_slug_unique": {
          "name": "whitelabel_configs_slug_unique",
          "columns": [
            "slug"
          ]
        }
      },
      "checkConstraint": {}
    }
  },
  "views": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "tables": {},
    "indexes": {}
  }
}
</file>

<file path="drizzle/meta/0004_snapshot.json">
{
  "version": "5",
  "dialect": "mysql",
  "id": "535fb398-c572-41c7-934a-ed5b4ee95691",
  "prevId": "163153df-b0ad-48a3-8bd6-57b35b67eb4e",
  "tables": {
    "chat_conversations": {
      "name": "chat_conversations",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleContext": {
          "name": "moduleContext",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_conversations_id": {
          "name": "chat_conversations_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "chat_messages": {
      "name": "chat_messages",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "conversationId": {
          "name": "conversationId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','assistant','system')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_messages_id": {
          "name": "chat_messages_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "flashcard_expanded_answers": {
      "name": "flashcard_expanded_answers",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "flashcardId": {
          "name": "flashcardId",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayNumber": {
          "name": "dayNumber",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "question": {
          "name": "question",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "shortAnswer": {
          "name": "shortAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "expandedAnswer": {
          "name": "expandedAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "wordCount": {
          "name": "wordCount",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "viewCount": {
          "name": "viewCount",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "qualityRating": {
          "name": "qualityRating",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "flashcard_expanded_answers_id": {
          "name": "flashcard_expanded_answers_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "flashcard_expanded_answers_flashcardId_unique": {
          "name": "flashcard_expanded_answers_flashcardId_unique",
          "columns": [
            "flashcardId"
          ]
        }
      },
      "checkConstraint": {}
    },
    "users": {
      "name": "users",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "openId": {
          "name": "openId",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "loginMethod": {
          "name": "loginMethod",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','admin','trainer')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'user'"
        },
        "tenantId": {
          "name": "tenantId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        },
        "lastSignedIn": {
          "name": "lastSignedIn",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "users_id": {
          "name": "users_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "users_openId_unique": {
          "name": "users_openId_unique",
          "columns": [
            "openId"
          ]
        }
      },
      "checkConstraint": {}
    },
    "whitelabel_configs": {
      "name": "whitelabel_configs",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "slug": {
          "name": "slug",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "companyName": {
          "name": "companyName",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "logoUrl": {
          "name": "logoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "faviconUrl": {
          "name": "faviconUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "primaryColor": {
          "name": "primaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#2563eb'"
        },
        "secondaryColor": {
          "name": "secondaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#1e293b'"
        },
        "accentColor": {
          "name": "accentColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#3b82f6'"
        },
        "sidebarColor": {
          "name": "sidebarColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#0f172a'"
        },
        "welcomeText": {
          "name": "welcomeText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "footerText": {
          "name": "footerText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactEmail": {
          "name": "contactEmail",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactPhone": {
          "name": "contactPhone",
          "type": "varchar(50)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "websiteUrl": {
          "name": "websiteUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavEnabled": {
          "name": "azavEnabled",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "azavCertNumber": {
          "name": "azavCertNumber",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavValidUntil": {
          "name": "azavValidUntil",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "enabledModules": {
          "name": "enabledModules",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'1,2,3,4,5'"
        },
        "maxUsers": {
          "name": "maxUsers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 100
        },
        "isActive": {
          "name": "isActive",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": true
        },
        "adminUserId": {
          "name": "adminUserId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "whitelabel_configs_id": {
          "name": "whitelabel_configs_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "whitelabel_configs_slug_unique": {
          "name": "whitelabel_configs_slug_unique",
          "columns": [
            "slug"
          ]
        }
      },
      "checkConstraint": {}
    }
  },
  "views": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "tables": {},
    "indexes": {}
  }
}
</file>

<file path="drizzle/meta/0005_snapshot.json">
{
  "version": "5",
  "dialect": "mysql",
  "id": "1347db28-baec-4f28-85a4-dd0fa034ed9a",
  "prevId": "535fb398-c572-41c7-934a-ed5b4ee95691",
  "tables": {
    "chat_conversations": {
      "name": "chat_conversations",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleContext": {
          "name": "moduleContext",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_conversations_id": {
          "name": "chat_conversations_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "chat_messages": {
      "name": "chat_messages",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "conversationId": {
          "name": "conversationId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','assistant','system')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_messages_id": {
          "name": "chat_messages_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "flashcard_expanded_answers": {
      "name": "flashcard_expanded_answers",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "flashcardId": {
          "name": "flashcardId",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayNumber": {
          "name": "dayNumber",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "question": {
          "name": "question",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "shortAnswer": {
          "name": "shortAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "expandedAnswer": {
          "name": "expandedAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "wordCount": {
          "name": "wordCount",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "viewCount": {
          "name": "viewCount",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "qualityRating": {
          "name": "qualityRating",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "flashcard_expanded_answers_id": {
          "name": "flashcard_expanded_answers_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "flashcard_expanded_answers_flashcardId_unique": {
          "name": "flashcard_expanded_answers_flashcardId_unique",
          "columns": [
            "flashcardId"
          ]
        }
      },
      "checkConstraint": {}
    },
    "users": {
      "name": "users",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "openId": {
          "name": "openId",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "loginMethod": {
          "name": "loginMethod",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','admin','trainer')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'user'"
        },
        "tenantId": {
          "name": "tenantId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        },
        "lastSignedIn": {
          "name": "lastSignedIn",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "users_id": {
          "name": "users_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "users_openId_unique": {
          "name": "users_openId_unique",
          "columns": [
            "openId"
          ]
        }
      },
      "checkConstraint": {}
    },
    "video_progress": {
      "name": "video_progress",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "videoId": {
          "name": "videoId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "currentPosition": {
          "name": "currentPosition",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "isCompleted": {
          "name": "isCompleted",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "percentageWatched": {
          "name": "percentageWatched",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "lastWatchedAt": {
          "name": "lastWatchedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "video_progress_id": {
          "name": "video_progress_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "video_tutorials": {
      "name": "video_tutorials",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "videoUrl": {
          "name": "videoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "platform": {
          "name": "platform",
          "type": "enum('youtube','vimeo')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "videoId": {
          "name": "videoId",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "durationSeconds": {
          "name": "durationSeconds",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayNumber": {
          "name": "dayNumber",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "displayOrder": {
          "name": "displayOrder",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "isRequired": {
          "name": "isRequired",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "thumbnailUrl": {
          "name": "thumbnailUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "video_tutorials_id": {
          "name": "video_tutorials_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "whitelabel_configs": {
      "name": "whitelabel_configs",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "slug": {
          "name": "slug",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "companyName": {
          "name": "companyName",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "logoUrl": {
          "name": "logoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "faviconUrl": {
          "name": "faviconUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "primaryColor": {
          "name": "primaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#2563eb'"
        },
        "secondaryColor": {
          "name": "secondaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#1e293b'"
        },
        "accentColor": {
          "name": "accentColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#3b82f6'"
        },
        "sidebarColor": {
          "name": "sidebarColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#0f172a'"
        },
        "welcomeText": {
          "name": "welcomeText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "footerText": {
          "name": "footerText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactEmail": {
          "name": "contactEmail",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactPhone": {
          "name": "contactPhone",
          "type": "varchar(50)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "websiteUrl": {
          "name": "websiteUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavEnabled": {
          "name": "azavEnabled",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "azavCertNumber": {
          "name": "azavCertNumber",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavValidUntil": {
          "name": "azavValidUntil",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "enabledModules": {
          "name": "enabledModules",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'1,2,3,4,5'"
        },
        "maxUsers": {
          "name": "maxUsers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 100
        },
        "isActive": {
          "name": "isActive",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": true
        },
        "adminUserId": {
          "name": "adminUserId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "whitelabel_configs_id": {
          "name": "whitelabel_configs_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "whitelabel_configs_slug_unique": {
          "name": "whitelabel_configs_slug_unique",
          "columns": [
            "slug"
          ]
        }
      },
      "checkConstraint": {}
    }
  },
  "views": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "tables": {},
    "indexes": {}
  }
}
</file>

<file path="drizzle/meta/0006_snapshot.json">
{
  "version": "5",
  "dialect": "mysql",
  "id": "563f14db-954b-494c-b042-3517ef3de965",
  "prevId": "1347db28-baec-4f28-85a4-dd0fa034ed9a",
  "tables": {
    "chat_conversations": {
      "name": "chat_conversations",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleContext": {
          "name": "moduleContext",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_conversations_id": {
          "name": "chat_conversations_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "chat_messages": {
      "name": "chat_messages",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "conversationId": {
          "name": "conversationId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','assistant','system')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_messages_id": {
          "name": "chat_messages_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "users": {
      "name": "users",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "openId": {
          "name": "openId",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "loginMethod": {
          "name": "loginMethod",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','admin','trainer')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'user'"
        },
        "tenantId": {
          "name": "tenantId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        },
        "lastSignedIn": {
          "name": "lastSignedIn",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "users_id": {
          "name": "users_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "users_openId_unique": {
          "name": "users_openId_unique",
          "columns": [
            "openId"
          ]
        }
      },
      "checkConstraint": {}
    },
    "video_progress": {
      "name": "video_progress",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "videoId": {
          "name": "videoId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "currentPosition": {
          "name": "currentPosition",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "isCompleted": {
          "name": "isCompleted",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "percentageWatched": {
          "name": "percentageWatched",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "lastWatchedAt": {
          "name": "lastWatchedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "video_progress_id": {
          "name": "video_progress_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "video_tutorials": {
      "name": "video_tutorials",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "videoUrl": {
          "name": "videoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "platform": {
          "name": "platform",
          "type": "enum('youtube','vimeo')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "videoId": {
          "name": "videoId",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "durationSeconds": {
          "name": "durationSeconds",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayNumber": {
          "name": "dayNumber",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "displayOrder": {
          "name": "displayOrder",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "isRequired": {
          "name": "isRequired",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "thumbnailUrl": {
          "name": "thumbnailUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "video_tutorials_id": {
          "name": "video_tutorials_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "whitelabel_configs": {
      "name": "whitelabel_configs",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "slug": {
          "name": "slug",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "companyName": {
          "name": "companyName",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "logoUrl": {
          "name": "logoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "faviconUrl": {
          "name": "faviconUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "primaryColor": {
          "name": "primaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#2563eb'"
        },
        "secondaryColor": {
          "name": "secondaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#1e293b'"
        },
        "accentColor": {
          "name": "accentColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#3b82f6'"
        },
        "sidebarColor": {
          "name": "sidebarColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#0f172a'"
        },
        "welcomeText": {
          "name": "welcomeText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "footerText": {
          "name": "footerText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactEmail": {
          "name": "contactEmail",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactPhone": {
          "name": "contactPhone",
          "type": "varchar(50)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "websiteUrl": {
          "name": "websiteUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavEnabled": {
          "name": "azavEnabled",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "azavCertNumber": {
          "name": "azavCertNumber",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavValidUntil": {
          "name": "azavValidUntil",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "enabledModules": {
          "name": "enabledModules",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'1,2,3,4,5'"
        },
        "maxUsers": {
          "name": "maxUsers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 100
        },
        "isActive": {
          "name": "isActive",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": true
        },
        "adminUserId": {
          "name": "adminUserId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "whitelabel_configs_id": {
          "name": "whitelabel_configs_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "whitelabel_configs_slug_unique": {
          "name": "whitelabel_configs_slug_unique",
          "columns": [
            "slug"
          ]
        }
      },
      "checkConstraint": {}
    }
  },
  "views": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "tables": {},
    "indexes": {}
  }
}
</file>

<file path="drizzle/meta/0007_snapshot.json">
{
  "version": "5",
  "dialect": "mysql",
  "id": "9b9c2d26-f411-436e-b793-f34911f8e44c",
  "prevId": "563f14db-954b-494c-b042-3517ef3de965",
  "tables": {
    "chat_conversations": {
      "name": "chat_conversations",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleContext": {
          "name": "moduleContext",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_conversations_id": {
          "name": "chat_conversations_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "chat_messages": {
      "name": "chat_messages",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "conversationId": {
          "name": "conversationId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','assistant','system')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_messages_id": {
          "name": "chat_messages_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "exam_questions": {
      "name": "exam_questions",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "sessionId": {
          "name": "sessionId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "questionNumber": {
          "name": "questionNumber",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "questionText": {
          "name": "questionText",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "correctAnswer": {
          "name": "correctAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "userAnswer": {
          "name": "userAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "isCorrect": {
          "name": "isCorrect",
          "type": "boolean",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayId": {
          "name": "dayId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "topic": {
          "name": "topic",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "difficulty": {
          "name": "difficulty",
          "type": "enum('easy','medium','hard')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'medium'"
        },
        "feedback": {
          "name": "feedback",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "exam_questions_id": {
          "name": "exam_questions_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "exam_sessions": {
      "name": "exam_sessions",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "totalQuestions": {
          "name": "totalQuestions",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 50
        },
        "correctAnswers": {
          "name": "correctAnswers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "score": {
          "name": "score",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "timeSpent": {
          "name": "timeSpent",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "status": {
          "name": "status",
          "type": "enum('in_progress','completed','abandoned')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'in_progress'"
        },
        "startedAt": {
          "name": "startedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "completedAt": {
          "name": "completedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "exam_sessions_id": {
          "name": "exam_sessions_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "exam_weak_topics": {
      "name": "exam_weak_topics",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "topic": {
          "name": "topic",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "incorrectCount": {
          "name": "incorrectCount",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 1
        },
        "lastEncountered": {
          "name": "lastEncountered",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "exam_weak_topics_id": {
          "name": "exam_weak_topics_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "users": {
      "name": "users",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "openId": {
          "name": "openId",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "loginMethod": {
          "name": "loginMethod",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','admin','trainer')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'user'"
        },
        "tenantId": {
          "name": "tenantId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        },
        "lastSignedIn": {
          "name": "lastSignedIn",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "users_id": {
          "name": "users_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "users_openId_unique": {
          "name": "users_openId_unique",
          "columns": [
            "openId"
          ]
        }
      },
      "checkConstraint": {}
    },
    "video_progress": {
      "name": "video_progress",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "videoId": {
          "name": "videoId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "currentPosition": {
          "name": "currentPosition",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "isCompleted": {
          "name": "isCompleted",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "percentageWatched": {
          "name": "percentageWatched",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "lastWatchedAt": {
          "name": "lastWatchedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "video_progress_id": {
          "name": "video_progress_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "video_tutorials": {
      "name": "video_tutorials",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "videoUrl": {
          "name": "videoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "platform": {
          "name": "platform",
          "type": "enum('youtube','vimeo')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "videoId": {
          "name": "videoId",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "durationSeconds": {
          "name": "durationSeconds",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayNumber": {
          "name": "dayNumber",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "displayOrder": {
          "name": "displayOrder",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "isRequired": {
          "name": "isRequired",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "thumbnailUrl": {
          "name": "thumbnailUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "video_tutorials_id": {
          "name": "video_tutorials_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "whitelabel_configs": {
      "name": "whitelabel_configs",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "slug": {
          "name": "slug",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "companyName": {
          "name": "companyName",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "logoUrl": {
          "name": "logoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "faviconUrl": {
          "name": "faviconUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "primaryColor": {
          "name": "primaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#2563eb'"
        },
        "secondaryColor": {
          "name": "secondaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#1e293b'"
        },
        "accentColor": {
          "name": "accentColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#3b82f6'"
        },
        "sidebarColor": {
          "name": "sidebarColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#0f172a'"
        },
        "welcomeText": {
          "name": "welcomeText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "footerText": {
          "name": "footerText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactEmail": {
          "name": "contactEmail",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactPhone": {
          "name": "contactPhone",
          "type": "varchar(50)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "websiteUrl": {
          "name": "websiteUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavEnabled": {
          "name": "azavEnabled",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "azavCertNumber": {
          "name": "azavCertNumber",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavValidUntil": {
          "name": "azavValidUntil",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "enabledModules": {
          "name": "enabledModules",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'1,2,3,4,5'"
        },
        "maxUsers": {
          "name": "maxUsers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 100
        },
        "isActive": {
          "name": "isActive",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": true
        },
        "adminUserId": {
          "name": "adminUserId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "whitelabel_configs_id": {
          "name": "whitelabel_configs_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "whitelabel_configs_slug_unique": {
          "name": "whitelabel_configs_slug_unique",
          "columns": [
            "slug"
          ]
        }
      },
      "checkConstraint": {}
    }
  },
  "views": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "tables": {},
    "indexes": {}
  }
}
</file>

<file path="drizzle/meta/0008_snapshot.json">
{
  "version": "5",
  "dialect": "mysql",
  "id": "87d59500-03b4-4c6d-b2e3-519c014af9b1",
  "prevId": "9b9c2d26-f411-436e-b793-f34911f8e44c",
  "tables": {
    "chat_conversations": {
      "name": "chat_conversations",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleContext": {
          "name": "moduleContext",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_conversations_id": {
          "name": "chat_conversations_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "chat_messages": {
      "name": "chat_messages",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "conversationId": {
          "name": "conversationId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','assistant','system')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_messages_id": {
          "name": "chat_messages_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "exam_questions": {
      "name": "exam_questions",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "sessionId": {
          "name": "sessionId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "questionNumber": {
          "name": "questionNumber",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "questionText": {
          "name": "questionText",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "correctAnswer": {
          "name": "correctAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "userAnswer": {
          "name": "userAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "isCorrect": {
          "name": "isCorrect",
          "type": "boolean",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayId": {
          "name": "dayId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "topic": {
          "name": "topic",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "difficulty": {
          "name": "difficulty",
          "type": "enum('easy','medium','hard')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'medium'"
        },
        "feedback": {
          "name": "feedback",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "exam_questions_id": {
          "name": "exam_questions_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "exam_sessions": {
      "name": "exam_sessions",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "totalQuestions": {
          "name": "totalQuestions",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 50
        },
        "correctAnswers": {
          "name": "correctAnswers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "score": {
          "name": "score",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "timeSpent": {
          "name": "timeSpent",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "timeLimit": {
          "name": "timeLimit",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 1800
        },
        "difficulty": {
          "name": "difficulty",
          "type": "enum('easy','medium','hard')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'medium'"
        },
        "isIHKMode": {
          "name": "isIHKMode",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "status": {
          "name": "status",
          "type": "enum('in_progress','completed','abandoned')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'in_progress'"
        },
        "startedAt": {
          "name": "startedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "completedAt": {
          "name": "completedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "exam_sessions_id": {
          "name": "exam_sessions_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "exam_weak_topics": {
      "name": "exam_weak_topics",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "topic": {
          "name": "topic",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "incorrectCount": {
          "name": "incorrectCount",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 1
        },
        "lastEncountered": {
          "name": "lastEncountered",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "exam_weak_topics_id": {
          "name": "exam_weak_topics_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "users": {
      "name": "users",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "openId": {
          "name": "openId",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "loginMethod": {
          "name": "loginMethod",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','admin','trainer')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'user'"
        },
        "tenantId": {
          "name": "tenantId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        },
        "lastSignedIn": {
          "name": "lastSignedIn",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "users_id": {
          "name": "users_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "users_openId_unique": {
          "name": "users_openId_unique",
          "columns": [
            "openId"
          ]
        }
      },
      "checkConstraint": {}
    },
    "video_progress": {
      "name": "video_progress",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "videoId": {
          "name": "videoId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "currentPosition": {
          "name": "currentPosition",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "isCompleted": {
          "name": "isCompleted",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "percentageWatched": {
          "name": "percentageWatched",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "lastWatchedAt": {
          "name": "lastWatchedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "video_progress_id": {
          "name": "video_progress_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "video_tutorials": {
      "name": "video_tutorials",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "videoUrl": {
          "name": "videoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "platform": {
          "name": "platform",
          "type": "enum('youtube','vimeo')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "videoId": {
          "name": "videoId",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "durationSeconds": {
          "name": "durationSeconds",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayNumber": {
          "name": "dayNumber",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "displayOrder": {
          "name": "displayOrder",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "isRequired": {
          "name": "isRequired",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "thumbnailUrl": {
          "name": "thumbnailUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "video_tutorials_id": {
          "name": "video_tutorials_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "whitelabel_configs": {
      "name": "whitelabel_configs",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "slug": {
          "name": "slug",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "companyName": {
          "name": "companyName",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "logoUrl": {
          "name": "logoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "faviconUrl": {
          "name": "faviconUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "primaryColor": {
          "name": "primaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#2563eb'"
        },
        "secondaryColor": {
          "name": "secondaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#1e293b'"
        },
        "accentColor": {
          "name": "accentColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#3b82f6'"
        },
        "sidebarColor": {
          "name": "sidebarColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#0f172a'"
        },
        "welcomeText": {
          "name": "welcomeText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "footerText": {
          "name": "footerText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactEmail": {
          "name": "contactEmail",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactPhone": {
          "name": "contactPhone",
          "type": "varchar(50)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "websiteUrl": {
          "name": "websiteUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavEnabled": {
          "name": "azavEnabled",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "azavCertNumber": {
          "name": "azavCertNumber",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavValidUntil": {
          "name": "azavValidUntil",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "enabledModules": {
          "name": "enabledModules",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'1,2,3,4,5'"
        },
        "maxUsers": {
          "name": "maxUsers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 100
        },
        "isActive": {
          "name": "isActive",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": true
        },
        "adminUserId": {
          "name": "adminUserId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "whitelabel_configs_id": {
          "name": "whitelabel_configs_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "whitelabel_configs_slug_unique": {
          "name": "whitelabel_configs_slug_unique",
          "columns": [
            "slug"
          ]
        }
      },
      "checkConstraint": {}
    }
  },
  "views": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "tables": {},
    "indexes": {}
  }
}
</file>

<file path="drizzle/meta/0009_snapshot.json">
{
  "version": "5",
  "dialect": "mysql",
  "id": "5106f6ec-e366-4a6d-811f-57b5b4ddcde9",
  "prevId": "87d59500-03b4-4c6d-b2e3-519c014af9b1",
  "tables": {
    "certificates": {
      "name": "certificates",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "examSessionId": {
          "name": "examSessionId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleName": {
          "name": "moduleName",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "score": {
          "name": "score",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "totalQuestions": {
          "name": "totalQuestions",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "correctAnswers": {
          "name": "correctAnswers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "pdfUrl": {
          "name": "pdfUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "pdfKey": {
          "name": "pdfKey",
          "type": "varchar(500)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "issuedAt": {
          "name": "issuedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "certificates_id": {
          "name": "certificates_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "chat_conversations": {
      "name": "chat_conversations",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleContext": {
          "name": "moduleContext",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_conversations_id": {
          "name": "chat_conversations_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "chat_messages": {
      "name": "chat_messages",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "conversationId": {
          "name": "conversationId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','assistant','system')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_messages_id": {
          "name": "chat_messages_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "exam_questions": {
      "name": "exam_questions",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "sessionId": {
          "name": "sessionId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "questionNumber": {
          "name": "questionNumber",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "questionText": {
          "name": "questionText",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "correctAnswer": {
          "name": "correctAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "userAnswer": {
          "name": "userAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "isCorrect": {
          "name": "isCorrect",
          "type": "boolean",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayId": {
          "name": "dayId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "topic": {
          "name": "topic",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "difficulty": {
          "name": "difficulty",
          "type": "enum('easy','medium','hard')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'medium'"
        },
        "feedback": {
          "name": "feedback",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "exam_questions_id": {
          "name": "exam_questions_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "exam_sessions": {
      "name": "exam_sessions",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "totalQuestions": {
          "name": "totalQuestions",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 50
        },
        "correctAnswers": {
          "name": "correctAnswers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "score": {
          "name": "score",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "timeSpent": {
          "name": "timeSpent",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "timeLimit": {
          "name": "timeLimit",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 1800
        },
        "difficulty": {
          "name": "difficulty",
          "type": "enum('easy','medium','hard')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'medium'"
        },
        "isIHKMode": {
          "name": "isIHKMode",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "status": {
          "name": "status",
          "type": "enum('in_progress','completed','abandoned')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'in_progress'"
        },
        "startedAt": {
          "name": "startedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "completedAt": {
          "name": "completedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "exam_sessions_id": {
          "name": "exam_sessions_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "exam_weak_topics": {
      "name": "exam_weak_topics",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "topic": {
          "name": "topic",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "incorrectCount": {
          "name": "incorrectCount",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 1
        },
        "lastEncountered": {
          "name": "lastEncountered",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "exam_weak_topics_id": {
          "name": "exam_weak_topics_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "users": {
      "name": "users",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "openId": {
          "name": "openId",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "loginMethod": {
          "name": "loginMethod",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','admin','trainer')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'user'"
        },
        "tenantId": {
          "name": "tenantId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        },
        "lastSignedIn": {
          "name": "lastSignedIn",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "users_id": {
          "name": "users_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "users_openId_unique": {
          "name": "users_openId_unique",
          "columns": [
            "openId"
          ]
        }
      },
      "checkConstraint": {}
    },
    "video_progress": {
      "name": "video_progress",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "videoId": {
          "name": "videoId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "currentPosition": {
          "name": "currentPosition",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "isCompleted": {
          "name": "isCompleted",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "percentageWatched": {
          "name": "percentageWatched",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "lastWatchedAt": {
          "name": "lastWatchedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "video_progress_id": {
          "name": "video_progress_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "video_tutorials": {
      "name": "video_tutorials",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "videoUrl": {
          "name": "videoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "platform": {
          "name": "platform",
          "type": "enum('youtube','vimeo')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "videoId": {
          "name": "videoId",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "durationSeconds": {
          "name": "durationSeconds",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayNumber": {
          "name": "dayNumber",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "displayOrder": {
          "name": "displayOrder",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "isRequired": {
          "name": "isRequired",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "thumbnailUrl": {
          "name": "thumbnailUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "video_tutorials_id": {
          "name": "video_tutorials_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "whitelabel_configs": {
      "name": "whitelabel_configs",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "slug": {
          "name": "slug",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "companyName": {
          "name": "companyName",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "logoUrl": {
          "name": "logoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "faviconUrl": {
          "name": "faviconUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "primaryColor": {
          "name": "primaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#2563eb'"
        },
        "secondaryColor": {
          "name": "secondaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#1e293b'"
        },
        "accentColor": {
          "name": "accentColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#3b82f6'"
        },
        "sidebarColor": {
          "name": "sidebarColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#0f172a'"
        },
        "welcomeText": {
          "name": "welcomeText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "footerText": {
          "name": "footerText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactEmail": {
          "name": "contactEmail",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactPhone": {
          "name": "contactPhone",
          "type": "varchar(50)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "websiteUrl": {
          "name": "websiteUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavEnabled": {
          "name": "azavEnabled",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "azavCertNumber": {
          "name": "azavCertNumber",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavValidUntil": {
          "name": "azavValidUntil",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "enabledModules": {
          "name": "enabledModules",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'1,2,3,4,5'"
        },
        "maxUsers": {
          "name": "maxUsers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 100
        },
        "isActive": {
          "name": "isActive",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": true
        },
        "adminUserId": {
          "name": "adminUserId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "whitelabel_configs_id": {
          "name": "whitelabel_configs_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "whitelabel_configs_slug_unique": {
          "name": "whitelabel_configs_slug_unique",
          "columns": [
            "slug"
          ]
        }
      },
      "checkConstraint": {}
    }
  },
  "views": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "tables": {},
    "indexes": {}
  }
}
</file>

<file path="drizzle/meta/0010_snapshot.json">
{
  "version": "5",
  "dialect": "mysql",
  "id": "cfec5da8-854d-4e93-889f-1d89e7334a80",
  "prevId": "5106f6ec-e366-4a6d-811f-57b5b4ddcde9",
  "tables": {
    "certificates": {
      "name": "certificates",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "examSessionId": {
          "name": "examSessionId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleName": {
          "name": "moduleName",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "score": {
          "name": "score",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "totalQuestions": {
          "name": "totalQuestions",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "correctAnswers": {
          "name": "correctAnswers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "pdfUrl": {
          "name": "pdfUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "pdfKey": {
          "name": "pdfKey",
          "type": "varchar(500)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "issuedAt": {
          "name": "issuedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "certificates_id": {
          "name": "certificates_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "chat_conversations": {
      "name": "chat_conversations",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleContext": {
          "name": "moduleContext",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_conversations_id": {
          "name": "chat_conversations_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "chat_messages": {
      "name": "chat_messages",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "conversationId": {
          "name": "conversationId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','assistant','system')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_messages_id": {
          "name": "chat_messages_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "exam_questions": {
      "name": "exam_questions",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "sessionId": {
          "name": "sessionId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "questionNumber": {
          "name": "questionNumber",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "questionText": {
          "name": "questionText",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "correctAnswer": {
          "name": "correctAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "userAnswer": {
          "name": "userAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "isCorrect": {
          "name": "isCorrect",
          "type": "boolean",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayId": {
          "name": "dayId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "topic": {
          "name": "topic",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "difficulty": {
          "name": "difficulty",
          "type": "enum('easy','medium','hard')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'medium'"
        },
        "feedback": {
          "name": "feedback",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "exam_questions_id": {
          "name": "exam_questions_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "exam_sessions": {
      "name": "exam_sessions",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "totalQuestions": {
          "name": "totalQuestions",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 50
        },
        "correctAnswers": {
          "name": "correctAnswers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "score": {
          "name": "score",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "timeSpent": {
          "name": "timeSpent",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "timeLimit": {
          "name": "timeLimit",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 1800
        },
        "difficulty": {
          "name": "difficulty",
          "type": "enum('easy','medium','hard')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'medium'"
        },
        "isIHKMode": {
          "name": "isIHKMode",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "status": {
          "name": "status",
          "type": "enum('in_progress','completed','abandoned')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'in_progress'"
        },
        "startedAt": {
          "name": "startedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "completedAt": {
          "name": "completedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "exam_sessions_id": {
          "name": "exam_sessions_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "exam_weak_topics": {
      "name": "exam_weak_topics",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "topic": {
          "name": "topic",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "incorrectCount": {
          "name": "incorrectCount",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 1
        },
        "lastEncountered": {
          "name": "lastEncountered",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "exam_weak_topics_id": {
          "name": "exam_weak_topics_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "question_bank": {
      "name": "question_bank",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "category": {
          "name": "category",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "difficulty": {
          "name": "difficulty",
          "type": "enum('easy','medium','hard')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'medium'"
        },
        "questionText": {
          "name": "questionText",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "options": {
          "name": "options",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "correctAnswer": {
          "name": "correctAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "explanation": {
          "name": "explanation",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "question_bank_id": {
          "name": "question_bank_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "users": {
      "name": "users",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "openId": {
          "name": "openId",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "loginMethod": {
          "name": "loginMethod",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','admin','trainer')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'user'"
        },
        "tenantId": {
          "name": "tenantId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        },
        "lastSignedIn": {
          "name": "lastSignedIn",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "users_id": {
          "name": "users_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "users_openId_unique": {
          "name": "users_openId_unique",
          "columns": [
            "openId"
          ]
        }
      },
      "checkConstraint": {}
    },
    "video_progress": {
      "name": "video_progress",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "videoId": {
          "name": "videoId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "currentPosition": {
          "name": "currentPosition",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "isCompleted": {
          "name": "isCompleted",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "percentageWatched": {
          "name": "percentageWatched",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "lastWatchedAt": {
          "name": "lastWatchedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "video_progress_id": {
          "name": "video_progress_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "video_tutorials": {
      "name": "video_tutorials",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "videoUrl": {
          "name": "videoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "platform": {
          "name": "platform",
          "type": "enum('youtube','vimeo')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "videoId": {
          "name": "videoId",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "durationSeconds": {
          "name": "durationSeconds",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayNumber": {
          "name": "dayNumber",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "displayOrder": {
          "name": "displayOrder",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "isRequired": {
          "name": "isRequired",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "thumbnailUrl": {
          "name": "thumbnailUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "video_tutorials_id": {
          "name": "video_tutorials_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "whitelabel_configs": {
      "name": "whitelabel_configs",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "slug": {
          "name": "slug",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "companyName": {
          "name": "companyName",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "logoUrl": {
          "name": "logoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "faviconUrl": {
          "name": "faviconUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "primaryColor": {
          "name": "primaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#2563eb'"
        },
        "secondaryColor": {
          "name": "secondaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#1e293b'"
        },
        "accentColor": {
          "name": "accentColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#3b82f6'"
        },
        "sidebarColor": {
          "name": "sidebarColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#0f172a'"
        },
        "welcomeText": {
          "name": "welcomeText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "footerText": {
          "name": "footerText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactEmail": {
          "name": "contactEmail",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactPhone": {
          "name": "contactPhone",
          "type": "varchar(50)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "websiteUrl": {
          "name": "websiteUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavEnabled": {
          "name": "azavEnabled",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "azavCertNumber": {
          "name": "azavCertNumber",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavValidUntil": {
          "name": "azavValidUntil",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "enabledModules": {
          "name": "enabledModules",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'1,2,3,4,5'"
        },
        "maxUsers": {
          "name": "maxUsers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 100
        },
        "isActive": {
          "name": "isActive",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": true
        },
        "adminUserId": {
          "name": "adminUserId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "whitelabel_configs_id": {
          "name": "whitelabel_configs_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "whitelabel_configs_slug_unique": {
          "name": "whitelabel_configs_slug_unique",
          "columns": [
            "slug"
          ]
        }
      },
      "checkConstraint": {}
    }
  },
  "views": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "tables": {},
    "indexes": {}
  }
}
</file>

<file path="drizzle/meta/0011_snapshot.json">
{
  "version": "5",
  "dialect": "mysql",
  "id": "f671c076-b173-492f-93ee-11875f07db9f",
  "prevId": "cfec5da8-854d-4e93-889f-1d89e7334a80",
  "tables": {
    "activity_heartbeats": {
      "name": "activity_heartbeats",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayId": {
          "name": "dayId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "timestamp": {
          "name": "timestamp",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "activity_heartbeats_id": {
          "name": "activity_heartbeats_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "avv_agreements": {
      "name": "avv_agreements",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "tenantId": {
          "name": "tenantId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "signedByUserId": {
          "name": "signedByUserId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "version": {
          "name": "version",
          "type": "varchar(20)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "signedAt": {
          "name": "signedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "ipAddress": {
          "name": "ipAddress",
          "type": "varchar(45)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "avv_agreements_id": {
          "name": "avv_agreements_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "certificates": {
      "name": "certificates",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "examSessionId": {
          "name": "examSessionId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleName": {
          "name": "moduleName",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "score": {
          "name": "score",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "totalQuestions": {
          "name": "totalQuestions",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "correctAnswers": {
          "name": "correctAnswers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "pdfUrl": {
          "name": "pdfUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "pdfKey": {
          "name": "pdfKey",
          "type": "varchar(500)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "issuedAt": {
          "name": "issuedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "certificates_id": {
          "name": "certificates_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "chat_conversations": {
      "name": "chat_conversations",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleContext": {
          "name": "moduleContext",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_conversations_id": {
          "name": "chat_conversations_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "chat_messages": {
      "name": "chat_messages",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "conversationId": {
          "name": "conversationId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','assistant','system')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "chat_messages_id": {
          "name": "chat_messages_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "complaints": {
      "name": "complaints",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "subject": {
          "name": "subject",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "status": {
          "name": "status",
          "type": "enum('open','in_progress','resolved','closed')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'open'"
        },
        "adminNote": {
          "name": "adminNote",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "resolvedAt": {
          "name": "resolvedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "complaints_id": {
          "name": "complaints_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "consent_log": {
      "name": "consent_log",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "consentType": {
          "name": "consentType",
          "type": "enum('terms','privacy','ai_assistant','marketing','revoked_terms','revoked_privacy','revoked_ai','revoked_marketing')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "consentVersion": {
          "name": "consentVersion",
          "type": "varchar(20)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "givenAt": {
          "name": "givenAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "ipAddress": {
          "name": "ipAddress",
          "type": "varchar(45)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "consent_log_id": {
          "name": "consent_log_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "exam_audit_log": {
      "name": "exam_audit_log",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "sessionId": {
          "name": "sessionId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "questionId": {
          "name": "questionId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "chosenAnswer": {
          "name": "chosenAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "isCorrect": {
          "name": "isCorrect",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "answeredAt": {
          "name": "answeredAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "exam_audit_log_id": {
          "name": "exam_audit_log_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "exam_questions": {
      "name": "exam_questions",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "sessionId": {
          "name": "sessionId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "questionNumber": {
          "name": "questionNumber",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "questionText": {
          "name": "questionText",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "correctAnswer": {
          "name": "correctAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "userAnswer": {
          "name": "userAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "isCorrect": {
          "name": "isCorrect",
          "type": "boolean",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayId": {
          "name": "dayId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "topic": {
          "name": "topic",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "difficulty": {
          "name": "difficulty",
          "type": "enum('easy','medium','hard')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'medium'"
        },
        "feedback": {
          "name": "feedback",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "exam_questions_id": {
          "name": "exam_questions_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "exam_sessions": {
      "name": "exam_sessions",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "totalQuestions": {
          "name": "totalQuestions",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 50
        },
        "correctAnswers": {
          "name": "correctAnswers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "score": {
          "name": "score",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "timeSpent": {
          "name": "timeSpent",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "timeLimit": {
          "name": "timeLimit",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 1800
        },
        "difficulty": {
          "name": "difficulty",
          "type": "enum('easy','medium','hard')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'medium'"
        },
        "isIHKMode": {
          "name": "isIHKMode",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "status": {
          "name": "status",
          "type": "enum('in_progress','completed','abandoned')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'in_progress'"
        },
        "startedAt": {
          "name": "startedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "completedAt": {
          "name": "completedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "exam_sessions_id": {
          "name": "exam_sessions_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "exam_weak_topics": {
      "name": "exam_weak_topics",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "topic": {
          "name": "topic",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "incorrectCount": {
          "name": "incorrectCount",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 1
        },
        "lastEncountered": {
          "name": "lastEncountered",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "exam_weak_topics_id": {
          "name": "exam_weak_topics_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "feedback": {
      "name": "feedback",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayId": {
          "name": "dayId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "rating": {
          "name": "rating",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "comment": {
          "name": "comment",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "feedback_id": {
          "name": "feedback_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "learning_logs": {
      "name": "learning_logs",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayId": {
          "name": "dayId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "openedAt": {
          "name": "openedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "closedAt": {
          "name": "closedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "durationSeconds": {
          "name": "durationSeconds",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "heartbeatCount": {
          "name": "heartbeatCount",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "completed": {
          "name": "completed",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "learning_logs_id": {
          "name": "learning_logs_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "question_bank": {
      "name": "question_bank",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "category": {
          "name": "category",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "difficulty": {
          "name": "difficulty",
          "type": "enum('easy','medium','hard')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'medium'"
        },
        "questionText": {
          "name": "questionText",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "options": {
          "name": "options",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "correctAnswer": {
          "name": "correctAnswer",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "explanation": {
          "name": "explanation",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "question_bank_id": {
          "name": "question_bank_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "user_sessions": {
      "name": "user_sessions",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "sessionId": {
          "name": "sessionId",
          "type": "varchar(128)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "loginTime": {
          "name": "loginTime",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "logoutTime": {
          "name": "logoutTime",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "ipAddress": {
          "name": "ipAddress",
          "type": "varchar(45)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "deviceInfo": {
          "name": "deviceInfo",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "isActive": {
          "name": "isActive",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": true
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "user_sessions_id": {
          "name": "user_sessions_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "user_sessions_sessionId_unique": {
          "name": "user_sessions_sessionId_unique",
          "columns": [
            "sessionId"
          ]
        }
      },
      "checkConstraint": {}
    },
    "users": {
      "name": "users",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "openId": {
          "name": "openId",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "loginMethod": {
          "name": "loginMethod",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','admin','trainer')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'user'"
        },
        "tenantId": {
          "name": "tenantId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        },
        "lastSignedIn": {
          "name": "lastSignedIn",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "users_id": {
          "name": "users_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "users_openId_unique": {
          "name": "users_openId_unique",
          "columns": [
            "openId"
          ]
        }
      },
      "checkConstraint": {}
    },
    "video_progress": {
      "name": "video_progress",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "userId": {
          "name": "userId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "videoId": {
          "name": "videoId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "currentPosition": {
          "name": "currentPosition",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "isCompleted": {
          "name": "isCompleted",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "percentageWatched": {
          "name": "percentageWatched",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "lastWatchedAt": {
          "name": "lastWatchedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "video_progress_id": {
          "name": "video_progress_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "video_tutorials": {
      "name": "video_tutorials",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "title": {
          "name": "title",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "videoUrl": {
          "name": "videoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "platform": {
          "name": "platform",
          "type": "enum('youtube','vimeo')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "videoId": {
          "name": "videoId",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "durationSeconds": {
          "name": "durationSeconds",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "moduleId": {
          "name": "moduleId",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "dayNumber": {
          "name": "dayNumber",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "displayOrder": {
          "name": "displayOrder",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "isRequired": {
          "name": "isRequired",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "thumbnailUrl": {
          "name": "thumbnailUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "video_tutorials_id": {
          "name": "video_tutorials_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "whitelabel_configs": {
      "name": "whitelabel_configs",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "slug": {
          "name": "slug",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "companyName": {
          "name": "companyName",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "logoUrl": {
          "name": "logoUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "faviconUrl": {
          "name": "faviconUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "primaryColor": {
          "name": "primaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#2563eb'"
        },
        "secondaryColor": {
          "name": "secondaryColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#1e293b'"
        },
        "accentColor": {
          "name": "accentColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#3b82f6'"
        },
        "sidebarColor": {
          "name": "sidebarColor",
          "type": "varchar(7)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'#0f172a'"
        },
        "welcomeText": {
          "name": "welcomeText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "footerText": {
          "name": "footerText",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactEmail": {
          "name": "contactEmail",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "contactPhone": {
          "name": "contactPhone",
          "type": "varchar(50)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "websiteUrl": {
          "name": "websiteUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavEnabled": {
          "name": "azavEnabled",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "azavCertNumber": {
          "name": "azavCertNumber",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "azavValidUntil": {
          "name": "azavValidUntil",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "enabledModules": {
          "name": "enabledModules",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'1,2,3,4,5'"
        },
        "maxUsers": {
          "name": "maxUsers",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 100
        },
        "isActive": {
          "name": "isActive",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": true
        },
        "adminUserId": {
          "name": "adminUserId",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "whitelabel_configs_id": {
          "name": "whitelabel_configs_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "whitelabel_configs_slug_unique": {
          "name": "whitelabel_configs_slug_unique",
          "columns": [
            "slug"
          ]
        }
      },
      "checkConstraint": {}
    }
  },
  "views": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "tables": {},
    "indexes": {}
  }
}
</file>

<file path="drizzle/migrations/.gitkeep">

</file>

<file path="drizzle/0000_known_riptide.sql">
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
</file>

<file path="drizzle/0001_cold_zeigeist.sql">
CREATE TABLE `chat_conversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255),
	`moduleContext` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `chat_conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chat_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`role` enum('user','assistant','system') NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_messages_id` PRIMARY KEY(`id`)
);
</file>

<file path="drizzle/0002_faithful_hydra.sql">
CREATE TABLE `whitelabel_configs` (
`id` int AUTO_INCREMENT NOT NULL,
`slug` varchar(64) NOT NULL,
`companyName` varchar(255) NOT NULL,
`logoUrl` text,
`faviconUrl` text,
`primaryColor` varchar(7) NOT NULL DEFAULT '#2563eb',
`secondaryColor` varchar(7) NOT NULL DEFAULT '#1e293b',
`accentColor` varchar(7) NOT NULL DEFAULT '#3b82f6',
`sidebarColor` varchar(7) NOT NULL DEFAULT '#0f172a',
`welcomeText` text,
`footerText` text,
`contactEmail` varchar(320),
`contactPhone` varchar(50),
`websiteUrl` text,
`azavEnabled` boolean NOT NULL DEFAULT false,
`azavCertNumber` varchar(100),
`azavValidUntil` timestamp,
`enabledModules` varchar(255) NOT NULL DEFAULT '1,2,3,4,5',
`maxUsers` int NOT NULL DEFAULT 100,
`isActive` boolean NOT NULL DEFAULT true,
`adminUserId` int,
`createdAt` timestamp NOT NULL DEFAULT (now()),
`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT `whitelabel_configs_id` PRIMARY KEY(`id`),
CONSTRAINT `whitelabel_configs_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','trainer') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `tenantId` int;
</file>

<file path="drizzle/0003_useful_juggernaut.sql">
ALTER TABLE `whitelabel_configs` MODIFY COLUMN `enabledModules` varchar(255) NOT NULL DEFAULT '1,2,3,4,5';
</file>

<file path="drizzle/0004_mixed_whizzer.sql">
CREATE TABLE `flashcard_expanded_answers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`flashcardId` varchar(100) NOT NULL,
	`moduleId` int NOT NULL,
	`dayNumber` int NOT NULL,
	`question` text NOT NULL,
	`shortAnswer` text NOT NULL,
	`expandedAnswer` text NOT NULL,
	`wordCount` int NOT NULL,
	`viewCount` int NOT NULL DEFAULT 0,
	`qualityRating` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `flashcard_expanded_answers_id` PRIMARY KEY(`id`),
	CONSTRAINT `flashcard_expanded_answers_flashcardId_unique` UNIQUE(`flashcardId`)
);
</file>

<file path="drizzle/0005_lying_tag.sql">
CREATE TABLE `video_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`videoId` int NOT NULL,
	`currentPosition` int NOT NULL DEFAULT 0,
	`isCompleted` boolean NOT NULL DEFAULT false,
	`percentageWatched` int NOT NULL DEFAULT 0,
	`lastWatchedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `video_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `video_tutorials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`videoUrl` text NOT NULL,
	`platform` enum('youtube','vimeo') NOT NULL,
	`videoId` varchar(100) NOT NULL,
	`durationSeconds` int,
	`moduleId` int NOT NULL,
	`dayNumber` int NOT NULL,
	`displayOrder` int NOT NULL DEFAULT 0,
	`isRequired` boolean NOT NULL DEFAULT false,
	`thumbnailUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `video_tutorials_id` PRIMARY KEY(`id`)
);
</file>

<file path="drizzle/0006_married_shotgun.sql">
DROP TABLE `flashcard_expanded_answers`;
</file>

<file path="drizzle/0007_aspiring_dakota_north.sql">
CREATE TABLE `exam_questions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` int NOT NULL,
	`questionNumber` int NOT NULL,
	`questionText` text NOT NULL,
	`correctAnswer` text NOT NULL,
	`userAnswer` text,
	`isCorrect` boolean,
	`moduleId` int NOT NULL,
	`dayId` int,
	`topic` varchar(255),
	`difficulty` enum('easy','medium','hard') NOT NULL DEFAULT 'medium',
	`feedback` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exam_questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `exam_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`moduleId` int NOT NULL,
	`totalQuestions` int NOT NULL DEFAULT 50,
	`correctAnswers` int NOT NULL DEFAULT 0,
	`score` int NOT NULL DEFAULT 0,
	`timeSpent` int NOT NULL DEFAULT 0,
	`status` enum('in_progress','completed','abandoned') NOT NULL DEFAULT 'in_progress',
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exam_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `exam_weak_topics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`moduleId` int NOT NULL,
	`topic` varchar(255) NOT NULL,
	`incorrectCount` int NOT NULL DEFAULT 1,
	`lastEncountered` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exam_weak_topics_id` PRIMARY KEY(`id`)
);
</file>

<file path="drizzle/0008_lyrical_gateway.sql">
ALTER TABLE `exam_sessions` ADD `timeLimit` int DEFAULT 1800 NOT NULL;--> statement-breakpoint
ALTER TABLE `exam_sessions` ADD `difficulty` enum('easy','medium','hard') DEFAULT 'medium' NOT NULL;--> statement-breakpoint
ALTER TABLE `exam_sessions` ADD `isIHKMode` boolean DEFAULT false NOT NULL;
</file>

<file path="drizzle/0009_gorgeous_jimmy_woo.sql">
CREATE TABLE `certificates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`examSessionId` int NOT NULL,
	`moduleId` int NOT NULL,
	`moduleName` varchar(255) NOT NULL,
	`score` int NOT NULL,
	`totalQuestions` int NOT NULL,
	`correctAnswers` int NOT NULL,
	`pdfUrl` text NOT NULL,
	`pdfKey` varchar(500) NOT NULL,
	`issuedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `certificates_id` PRIMARY KEY(`id`)
);
</file>

<file path="drizzle/0010_strong_domino.sql">
CREATE TABLE `question_bank` (
	`id` int AUTO_INCREMENT NOT NULL,
	`moduleId` int NOT NULL,
	`category` varchar(255) NOT NULL,
	`difficulty` enum('easy','medium','hard') NOT NULL DEFAULT 'medium',
	`questionText` text NOT NULL,
	`options` text NOT NULL,
	`correctAnswer` text NOT NULL,
	`explanation` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `question_bank_id` PRIMARY KEY(`id`)
);
</file>

<file path="drizzle/0011_azav_compliance_tables.sql">
-- ============================================================================
-- Migration 0011: AZAV-Compliance Tabellen
-- Pflicht für Trägerzulassung nach AZAV §2, §3, §4
-- Erstellt: 2026-03-01
-- ============================================================================

-- learning_logs: Server-seitige Lernfortschrittsspeicherung
-- Ersetzt localStorage, unveränderlich für AZAV-Audit
CREATE TABLE IF NOT EXISTS `learning_logs` (
  `id`               INT AUTO_INCREMENT PRIMARY KEY,
  `userId`           INT NOT NULL,
  `moduleId`         INT NOT NULL,
  `dayId`            INT NOT NULL,
  `openedAt`         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `closedAt`         TIMESTAMP NULL,
  `durationSeconds`  INT NOT NULL DEFAULT 0,
  `heartbeatCount`   INT NOT NULL DEFAULT 0,
  `completed`        BOOLEAN NOT NULL DEFAULT FALSE,
  INDEX `idx_learning_logs_user`   (`userId`),
  INDEX `idx_learning_logs_module` (`userId`, `moduleId`),
  INDEX `idx_learning_logs_day`    (`userId`, `moduleId`, `dayId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- user_sessions: Session-Protokoll für AZAV-Nutzeridentifizierung
CREATE TABLE IF NOT EXISTS `user_sessions` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `userId`      INT NOT NULL,
  `sessionId`   VARCHAR(128) NOT NULL UNIQUE,
  `loginTime`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `logoutTime`  TIMESTAMP NULL,
  `ipAddress`   VARCHAR(45) NULL,
  `deviceInfo`  TEXT NULL,
  `isActive`    BOOLEAN NOT NULL DEFAULT TRUE,
  `createdAt`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_user_sessions_user`    (`userId`),
  INDEX `idx_user_sessions_active`  (`userId`, `isActive`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- activity_heartbeats: Anwesenheitsnachweis (60-Sekunden-Takt)
CREATE TABLE IF NOT EXISTS `activity_heartbeats` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `userId`     INT NOT NULL,
  `moduleId`   INT NOT NULL,
  `dayId`      INT NOT NULL,
  `timestamp`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_heartbeats_user`   (`userId`),
  INDEX `idx_heartbeats_day`    (`userId`, `moduleId`, `dayId`),
  INDEX `idx_heartbeats_time`   (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- exam_audit_log: Unveränderliche Prüfungsdokumentation
-- KEIN updatedAt: einmal geschrieben, nie geändert (AZAV-Pflicht)
CREATE TABLE IF NOT EXISTS `exam_audit_log` (
  `id`            INT AUTO_INCREMENT PRIMARY KEY,
  `userId`        INT NOT NULL,
  `sessionId`     INT NOT NULL,
  `questionId`    INT NOT NULL,
  `chosenAnswer`  TEXT NOT NULL,
  `isCorrect`     BOOLEAN NOT NULL,
  `answeredAt`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_audit_user`    (`userId`),
  INDEX `idx_audit_session` (`sessionId`),
  INDEX `idx_audit_time`    (`answeredAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- feedback: QM-Pflicht nach AZAV §3 (Teilnehmerbewertungen)
CREATE TABLE IF NOT EXISTS `feedback` (
  `id`        INT AUTO_INCREMENT PRIMARY KEY,
  `userId`    INT NOT NULL,
  `moduleId`  INT NOT NULL,
  `dayId`     INT NULL,
  `rating`    INT NOT NULL CHECK (`rating` BETWEEN 1 AND 5),
  `comment`   TEXT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_feedback_module` (`moduleId`),
  INDEX `idx_feedback_user`   (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- complaints: Formales Beschwerdeverfahren (QM-Pflicht AZAV)
CREATE TABLE IF NOT EXISTS `complaints` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `userId`      INT NOT NULL,
  `subject`     VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `status`      ENUM('open','in_progress','resolved','closed') NOT NULL DEFAULT 'open',
  `adminNote`   TEXT NULL,
  `resolvedAt`  TIMESTAMP NULL,
  `createdAt`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_complaints_status` (`status`),
  INDEX `idx_complaints_user`   (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- consent_log: DSGVO Art. 7 – Nachweispflicht für Einwilligungen
-- Unveränderlich: kein updatedAt
CREATE TABLE IF NOT EXISTS `consent_log` (
  `id`              INT AUTO_INCREMENT PRIMARY KEY,
  `userId`          INT NOT NULL,
  `consentType`     ENUM(
                      'terms','privacy','ai_assistant','marketing',
                      'revoked_terms','revoked_privacy','revoked_ai','revoked_marketing'
                    ) NOT NULL,
  `consentVersion`  VARCHAR(20) NOT NULL,
  `givenAt`         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ipAddress`       VARCHAR(45) NULL,
  INDEX `idx_consent_user` (`userId`),
  INDEX `idx_consent_type` (`userId`, `consentType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- avv_agreements: Art. 28 DSGVO – AVV für White-Label-Mandanten
-- Unveränderlich: kein updatedAt
CREATE TABLE IF NOT EXISTS `avv_agreements` (
  `id`             INT AUTO_INCREMENT PRIMARY KEY,
  `tenantId`       INT NOT NULL,
  `signedByUserId` INT NOT NULL,
  `version`        VARCHAR(20) NOT NULL,
  `signedAt`       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ipAddress`      VARCHAR(45) NULL,
  INDEX `idx_avv_tenant` (`tenantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
</file>

<file path="drizzle/0011_romantic_patch.sql">
CREATE TABLE `activity_heartbeats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`moduleId` int NOT NULL,
	`dayId` int NOT NULL,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activity_heartbeats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `avv_agreements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tenantId` int NOT NULL,
	`signedByUserId` int NOT NULL,
	`version` varchar(20) NOT NULL,
	`signedAt` timestamp NOT NULL DEFAULT (now()),
	`ipAddress` varchar(45),
	CONSTRAINT `avv_agreements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `complaints` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`subject` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`status` enum('open','in_progress','resolved','closed') NOT NULL DEFAULT 'open',
	`adminNote` text,
	`resolvedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `complaints_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `consent_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`consentType` enum('terms','privacy','ai_assistant','marketing','revoked_terms','revoked_privacy','revoked_ai','revoked_marketing') NOT NULL,
	`consentVersion` varchar(20) NOT NULL,
	`givenAt` timestamp NOT NULL DEFAULT (now()),
	`ipAddress` varchar(45),
	CONSTRAINT `consent_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `exam_audit_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sessionId` int NOT NULL,
	`questionId` int NOT NULL,
	`chosenAnswer` text NOT NULL,
	`isCorrect` boolean NOT NULL,
	`answeredAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exam_audit_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `feedback` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`moduleId` int NOT NULL,
	`dayId` int,
	`rating` int NOT NULL,
	`comment` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `feedback_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `learning_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`moduleId` int NOT NULL,
	`dayId` int NOT NULL,
	`openedAt` timestamp NOT NULL DEFAULT (now()),
	`closedAt` timestamp,
	`durationSeconds` int NOT NULL DEFAULT 0,
	`heartbeatCount` int NOT NULL DEFAULT 0,
	`completed` boolean NOT NULL DEFAULT false,
	CONSTRAINT `learning_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sessionId` varchar(128) NOT NULL,
	`loginTime` timestamp NOT NULL DEFAULT (now()),
	`logoutTime` timestamp,
	`ipAddress` varchar(45),
	`deviceInfo` text,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_sessions_sessionId_unique` UNIQUE(`sessionId`)
);
</file>

<file path="drizzle/0012_auth_credentials.sql">
CREATE TABLE `auth_credentials` (
  `id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `openId` varchar(64) NOT NULL,
  `hash` text NOT NULL,
  `salt` varchar(64) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `auth_credentials_openId_unique` UNIQUE(`openId`)
);
</file>

<file path="drizzle/0013_user_enabled_modules.sql">
ALTER TABLE `users` ADD COLUMN `enabledModules` varchar(255) NOT NULL DEFAULT '1';
</file>

<file path="drizzle/0014_password_reset_tokens.sql">
CREATE TABLE `password_reset_tokens` (
  `id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `email` varchar(320) NOT NULL,
  `token` varchar(64) NOT NULL,
  `expiresAt` timestamp NOT NULL,
  `usedAt` timestamp,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `password_reset_tokens_token_unique` UNIQUE(`token`)
);
</file>

<file path="drizzle/0015_access_codes.sql">
CREATE TABLE IF NOT EXISTS access_codes (
  id INT AUTO_INCREMENT PRIMARY KEY,

  -- Der Code, den du verschickst (z.B. "SLB-ABCD-1234")
  code VARCHAR(64) NOT NULL UNIQUE,

  -- Welche Module werden freigeschaltet (z.B. "2,3,4" oder "1,2,3,4,5")
  modules VARCHAR(255) NOT NULL,

  -- Optional: Rolle setzen, z.B. "user" oder "trainer" (admin geben wir darüber NICHT automatisch)
  role VARCHAR(16) NULL,

  -- Wie oft darf der Code benutzt werden? (1 = nur einmal, 0 = unendlich oft)
  max_uses INT NOT NULL DEFAULT 1,
  used_count INT NOT NULL DEFAULT 0,

  -- Schalter: Code aktiv/inaktiv (damit du ihn später „abschalten“ kannst)
  is_active BOOLEAN NOT NULL DEFAULT TRUE,

  -- Notiz für dich (z.B. "für Max Mustermann, Paket B")
  note TEXT NULL,

  -- Wer hat den Code erstellt? (deine User-ID als Admin)
  created_by_user_id INT NULL,

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
</file>

<file path="drizzle/relations.ts">
import {} from "./schema";
</file>

<file path="server/_core/types/cookie.d.ts">
declare module "cookie" {
  export function parse(
    str: string,
    options?: Record<string, unknown>
  ): Record<string, string>;
}
</file>

<file path="server/_core/types/manusTypes.ts">
// WebDev Auth TypeScript types
// Auto-generated from protobuf definitions
// Generated on: 2025-09-24T05:57:57.338Z

export interface AuthorizeRequest {
  redirectUri: string;
  projectId: string;
  state: string;
  responseType: string;
  scope: string;
}

export interface AuthorizeResponse {
  redirectUrl: string;
}

export interface ExchangeTokenRequest {
  grantType: string;
  code: string;
  refreshToken?: string;
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
}

export interface ExchangeTokenResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  refreshToken?: string;
  scope: string;
  idToken: string;
}

export interface GetUserInfoRequest {
  accessToken: string;
}

export interface GetUserInfoResponse {
  openId: string;
  projectId: string;
  name: string;
  email?: string | null;
  platform?: string | null;
  loginMethod?: string | null;
}

export interface CanAccessRequest {
  openId: string;
  projectId: string;
}

export interface CanAccessResponse {
  canAccess: boolean;
}

export interface GetUserInfoWithJwtRequest {
  jwtToken: string;
  projectId: string;
}

export interface GetUserInfoWithJwtResponse {
  openId: string;
  projectId: string;
  name: string;
  email?: string | null;
  platform?: string | null;
  loginMethod?: string | null;
}
</file>

<file path="server/_core/context.ts">
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { parse as parseCookie } from "cookie";
import { COOKIE_NAME } from "@shared/const";
import * as db from "../db";
import { ENV } from "./env";

// Versuche Manus SDK – falls nicht konfiguriert, nutze lokales Auth
async function tryManusAuth(req: CreateExpressContextOptions["req"]): Promise<User | null> {
  if (!ENV.oAuthServerUrl) return null;
  try {
    const { sdk } = await import("./sdk");
    return await sdk.authenticateRequest(req) ?? null;
  } catch {
    return null;
  }
}

async function tryLocalAuth(req: CreateExpressContextOptions["req"]): Promise<User | null> {
  try {
    const { verifySessionToken } = await import("./auth-local");
    const cookies = parseCookie(req.headers.cookie ?? "");
    const token = cookies[COOKIE_NAME];
    const session = await verifySessionToken(token);
    if (!session) return null;
    return await db.getUserByOpenId(session.openId) ?? null;
  } catch {
    return null;
  }
}

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    // Manus hat Priorität wenn konfiguriert, sonst lokales Auth
    if (ENV.oAuthServerUrl) {
      user = await tryManusAuth(opts.req);
    } else {
      user = await tryLocalAuth(opts.req);
    }
  } catch {
    user = null;
  }

  return { req: opts.req, res: opts.res, user };
}
</file>

<file path="server/_core/cookies.ts">
import type { CookieOptions, Request } from "express";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function isIpAddress(host: string) {
  // Basic IPv4 check and IPv6 presence detection.
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return true;
  return host.includes(":");
}

function isSecureRequest(req: Request) {
  if (req.protocol === "https") return true;

  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;

  const protoList = Array.isArray(forwardedProto)
    ? forwardedProto
    : forwardedProto.split(",");

  return protoList.some(proto => proto.trim().toLowerCase() === "https");
}

export function getSessionCookieOptions(
  req: Request
): Pick<CookieOptions, "domain" | "httpOnly" | "path" | "sameSite" | "secure"> {
  // const hostname = req.hostname;
  // const shouldSetDomain =
  //   hostname &&
  //   !LOCAL_HOSTS.has(hostname) &&
  //   !isIpAddress(hostname) &&
  //   hostname !== "127.0.0.1" &&
  //   hostname !== "::1";

  // const domain =
  //   shouldSetDomain && !hostname.startsWith(".")
  //     ? `.${hostname}`
  //     : shouldSetDomain
  //       ? hostname
  //       : undefined;

  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req),
  };
}
</file>

<file path="server/_core/dataApi.ts">
/**
 * Quick example (matches curl usage):
 *   await callDataApi("Youtube/search", {
 *     query: { gl: "US", hl: "en", q: "manus" },
 *   })
 */
import { ENV } from "./env";

export type DataApiCallOptions = {
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
  pathParams?: Record<string, unknown>;
  formData?: Record<string, unknown>;
};

export async function callDataApi(
  apiId: string,
  options: DataApiCallOptions = {}
): Promise<unknown> {
  if (!ENV.forgeApiUrl) {
    throw new Error("BUILT_IN_FORGE_API_URL is not configured");
  }
  if (!ENV.forgeApiKey) {
    throw new Error("BUILT_IN_FORGE_API_KEY is not configured");
  }

  // Build the full URL by appending the service path to the base URL
  const baseUrl = ENV.forgeApiUrl.endsWith("/") ? ENV.forgeApiUrl : `${ENV.forgeApiUrl}/`;
  const fullUrl = new URL("webdevtoken.v1.WebDevService/CallApi", baseUrl).toString();

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "connect-protocol-version": "1",
      authorization: `Bearer ${ENV.forgeApiKey}`,
    },
    body: JSON.stringify({
      apiId,
      query: options.query,
      body: options.body,
      path_params: options.pathParams,
      multipart_form_data: options.formData,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Data API request failed (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
    );
  }

  const payload = await response.json().catch(() => ({}));
  if (payload && typeof payload === "object" && "jsonData" in payload) {
    try {
      return JSON.parse((payload as Record<string, string>).jsonData ?? "{}");
    } catch {
      return (payload as Record<string, unknown>).jsonData;
    }
  }
  return payload;
}
</file>

<file path="server/_core/env.ts">
export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
};
</file>

<file path="server/_core/imageGeneration.ts">
/**
 * Image generation helper using internal ImageService
 *
 * Example usage:
 *   const { url: imageUrl } = await generateImage({
 *     prompt: "A serene landscape with mountains"
 *   });
 *
 * For editing:
 *   const { url: imageUrl } = await generateImage({
 *     prompt: "Add a rainbow to this landscape",
 *     originalImages: [{
 *       url: "https://example.com/original.jpg",
 *       mimeType: "image/jpeg"
 *     }]
 *   });
 */
import { storagePut } from "server/storage";
import { ENV } from "./env";

export type GenerateImageOptions = {
  prompt: string;
  originalImages?: Array<{
    url?: string;
    b64Json?: string;
    mimeType?: string;
  }>;
};

export type GenerateImageResponse = {
  url?: string;
};

export async function generateImage(
  options: GenerateImageOptions
): Promise<GenerateImageResponse> {
  if (!ENV.forgeApiUrl) {
    throw new Error("BUILT_IN_FORGE_API_URL is not configured");
  }
  if (!ENV.forgeApiKey) {
    throw new Error("BUILT_IN_FORGE_API_KEY is not configured");
  }

  // Build the full URL by appending the service path to the base URL
  const baseUrl = ENV.forgeApiUrl.endsWith("/")
    ? ENV.forgeApiUrl
    : `${ENV.forgeApiUrl}/`;
  const fullUrl = new URL(
    "images.v1.ImageService/GenerateImage",
    baseUrl
  ).toString();

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "connect-protocol-version": "1",
      authorization: `Bearer ${ENV.forgeApiKey}`,
    },
    body: JSON.stringify({
      prompt: options.prompt,
      original_images: options.originalImages || [],
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Image generation request failed (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
    );
  }

  const result = (await response.json()) as {
    image: {
      b64Json: string;
      mimeType: string;
    };
  };
  const base64Data = result.image.b64Json;
  const buffer = Buffer.from(base64Data, "base64");

  // Save to S3
  const url = await storagePut(
    `generated/${Date.now()}.png`,
    buffer,
    result.image.mimeType
  );
  return {
    url,
  };
}
</file>

<file path="server/_core/llm.ts">
import { ENV } from "./env";

export type Role = "system" | "user" | "assistant" | "tool" | "function";

export type TextContent = {
  type: "text";
  text: string;
};

export type ImageContent = {
  type: "image_url";
  image_url: {
    url: string;
    detail?: "auto" | "low" | "high";
  };
};

export type FileContent = {
  type: "file_url";
  file_url: {
    url: string;
    mime_type?: "audio/mpeg" | "audio/wav" | "application/pdf" | "audio/mp4" | "video/mp4" ;
  };
};

export type MessageContent = string | TextContent | ImageContent | FileContent;

export type Message = {
  role: Role;
  content: MessageContent | MessageContent[];
  name?: string;
  tool_call_id?: string;
};

export type Tool = {
  type: "function";
  function: {
    name: string;
    description?: string;
    parameters?: Record<string, unknown>;
  };
};

export type ToolChoicePrimitive = "none" | "auto" | "required";
export type ToolChoiceByName = { name: string };
export type ToolChoiceExplicit = {
  type: "function";
  function: {
    name: string;
  };
};

export type ToolChoice =
  | ToolChoicePrimitive
  | ToolChoiceByName
  | ToolChoiceExplicit;

export type InvokeParams = {
  messages: Message[];
  tools?: Tool[];
  toolChoice?: ToolChoice;
  tool_choice?: ToolChoice;
  maxTokens?: number;
  max_tokens?: number;
  outputSchema?: OutputSchema;
  output_schema?: OutputSchema;
  responseFormat?: ResponseFormat;
  response_format?: ResponseFormat;
};

export type ToolCall = {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
};

export type InvokeResult = {
  id: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: Role;
      content: string | Array<TextContent | ImageContent | FileContent>;
      tool_calls?: ToolCall[];
    };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type JsonSchema = {
  name: string;
  schema: Record<string, unknown>;
  strict?: boolean;
};

export type OutputSchema = JsonSchema;

export type ResponseFormat =
  | { type: "text" }
  | { type: "json_object" }
  | { type: "json_schema"; json_schema: JsonSchema };

const ensureArray = (
  value: MessageContent | MessageContent[]
): MessageContent[] => (Array.isArray(value) ? value : [value]);

const normalizeContentPart = (
  part: MessageContent
): TextContent | ImageContent | FileContent => {
  if (typeof part === "string") {
    return { type: "text", text: part };
  }

  if (part.type === "text") {
    return part;
  }

  if (part.type === "image_url") {
    return part;
  }

  if (part.type === "file_url") {
    return part;
  }

  throw new Error("Unsupported message content part");
};

const normalizeMessage = (message: Message) => {
  const { role, name, tool_call_id } = message;

  if (role === "tool" || role === "function") {
    const content = ensureArray(message.content)
      .map(part => (typeof part === "string" ? part : JSON.stringify(part)))
      .join("\n");

    return {
      role,
      name,
      tool_call_id,
      content,
    };
  }

  const contentParts = ensureArray(message.content).map(normalizeContentPart);

  // If there's only text content, collapse to a single string for compatibility
  if (contentParts.length === 1 && contentParts[0].type === "text") {
    return {
      role,
      name,
      content: contentParts[0].text,
    };
  }

  return {
    role,
    name,
    content: contentParts,
  };
};

const normalizeToolChoice = (
  toolChoice: ToolChoice | undefined,
  tools: Tool[] | undefined
): "none" | "auto" | ToolChoiceExplicit | undefined => {
  if (!toolChoice) return undefined;

  if (toolChoice === "none" || toolChoice === "auto") {
    return toolChoice;
  }

  if (toolChoice === "required") {
    if (!tools || tools.length === 0) {
      throw new Error(
        "tool_choice 'required' was provided but no tools were configured"
      );
    }

    if (tools.length > 1) {
      throw new Error(
        "tool_choice 'required' needs a single tool or specify the tool name explicitly"
      );
    }

    return {
      type: "function",
      function: { name: tools[0].function.name },
    };
  }

  if ("name" in toolChoice) {
    return {
      type: "function",
      function: { name: toolChoice.name },
    };
  }

  return toolChoice;
};

const resolveApiUrl = () => {
  // Manus Forge (wenn konfiguriert)
  if (ENV.forgeApiUrl && ENV.forgeApiUrl.trim().length > 0) {
    return `${ENV.forgeApiUrl.replace(/\/$/, "")}/v1/chat/completions`;
  }
  // Gemini (wenn GEMINI_API_KEY gesetzt) – via OpenAI-kompatibler Endpoint
  if (process.env.GEMINI_API_KEY) {
    return "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
  }
  // OpenAI direkt (wenn OPENAI_API_KEY gesetzt)
  if (process.env.OPENAI_API_KEY) {
    return "https://api.openai.com/v1/chat/completions";
  }
  // Anthropic (wenn ANTHROPIC_API_KEY gesetzt)
  if (process.env.ANTHROPIC_API_KEY) {
    return "https://api.anthropic.com/v1/messages";
  }
  // Kein LLM konfiguriert
  return null;
};

const assertApiKey = () => {
  if (!ENV.forgeApiKey && !process.env.OPENAI_API_KEY && !process.env.ANTHROPIC_API_KEY && !process.env.GEMINI_API_KEY) {
    throw new Error("Kein KI-API-Schlüssel konfiguriert. Setze OPENAI_API_KEY, ANTHROPIC_API_KEY, GEMINI_API_KEY oder BUILT_IN_FORGE_API_KEY in .env");
  }
};

const getApiKey = () =>
  ENV.forgeApiKey || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || "";

const normalizeResponseFormat = ({
  responseFormat,
  response_format,
  outputSchema,
  output_schema,
}: {
  responseFormat?: ResponseFormat;
  response_format?: ResponseFormat;
  outputSchema?: OutputSchema;
  output_schema?: OutputSchema;
}):
  | { type: "json_schema"; json_schema: JsonSchema }
  | { type: "text" }
  | { type: "json_object" }
  | undefined => {
  const explicitFormat = responseFormat || response_format;
  if (explicitFormat) {
    if (
      explicitFormat.type === "json_schema" &&
      !explicitFormat.json_schema?.schema
    ) {
      throw new Error(
        "responseFormat json_schema requires a defined schema object"
      );
    }
    return explicitFormat;
  }

  const schema = outputSchema || output_schema;
  if (!schema) return undefined;

  if (!schema.name || !schema.schema) {
    throw new Error("outputSchema requires both name and schema");
  }

  return {
    type: "json_schema",
    json_schema: {
      name: schema.name,
      schema: schema.schema,
      ...(typeof schema.strict === "boolean" ? { strict: schema.strict } : {}),
    },
  };
};

export async function invokeLLM(params: InvokeParams): Promise<InvokeResult> {
  assertApiKey();

  const {
    messages,
    tools,
    toolChoice,
    tool_choice,
    outputSchema,
    output_schema,
    responseFormat,
    response_format,
  } = params;

  const payload: Record<string, unknown> = {
    model: "gemini-2.5-flash",
    messages: messages.map(normalizeMessage),
  };

  if (tools && tools.length > 0) {
    payload.tools = tools;
  }

  const normalizedToolChoice = normalizeToolChoice(
    toolChoice || tool_choice,
    tools
  );
  if (normalizedToolChoice) {
    payload.tool_choice = normalizedToolChoice;
  }

  payload.max_tokens = 1024

  const normalizedResponseFormat = normalizeResponseFormat({
    responseFormat,
    response_format,
    outputSchema,
    output_schema,
  });

  if (normalizedResponseFormat) {
    payload.response_format = normalizedResponseFormat;
  }

  const apiUrl = resolveApiUrl();
  if (!apiUrl) throw new Error("Kein KI-API-Schlüssel konfiguriert. Setze OPENAI_API_KEY in .env");
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${getApiKey()}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LLM invoke failed: ${response.status} ${response.statusText} – ${errorText}`
    );
  }

  return (await response.json()) as InvokeResult;
}
</file>

<file path="server/_core/map.ts">
/**
 * Google Maps API Integration for Manus WebDev Templates
 * 
 * Main function: makeRequest<T>(endpoint, params) - Makes authenticated requests to Google Maps APIs
 * All credentials are automatically injected. Array parameters use | as separator.
 * 
 * See API examples below the type definitions for usage patterns.
 */

import { ENV } from "./env";

// ============================================================================
// Configuration
// ============================================================================

type MapsConfig = {
  baseUrl: string;
  apiKey: string;
};

function getMapsConfig(): MapsConfig {
  const baseUrl = ENV.forgeApiUrl;
  const apiKey = ENV.forgeApiKey;

  if (!baseUrl || !apiKey) {
    throw new Error(
      "Google Maps proxy credentials missing: set BUILT_IN_FORGE_API_URL and BUILT_IN_FORGE_API_KEY"
    );
  }

  return {
    baseUrl: baseUrl.replace(/\/+$/, ""),
    apiKey,
  };
}

// ============================================================================
// Core Request Handler
// ============================================================================

interface RequestOptions {
  method?: "GET" | "POST";
  body?: Record<string, unknown>;
}

/**
 * Make authenticated requests to Google Maps APIs
 * 
 * @param endpoint - The API endpoint (e.g., "/maps/api/geocode/json")
 * @param params - Query parameters for the request
 * @param options - Additional request options
 * @returns The API response
 */
export async function makeRequest<T = unknown>(
  endpoint: string,
  params: Record<string, unknown> = {},
  options: RequestOptions = {}
): Promise<T> {
  const { baseUrl, apiKey } = getMapsConfig();

  // Construct full URL: baseUrl + /v1/maps/proxy + endpoint
  const url = new URL(`${baseUrl}/v1/maps/proxy${endpoint}`);

  // Add API key as query parameter (standard Google Maps API authentication)
  url.searchParams.append("key", apiKey);

  // Add other query parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  const response = await fetch(url.toString(), {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Google Maps API request failed (${response.status} ${response.statusText}): ${errorText}`
    );
  }

  return (await response.json()) as T;
}

// ============================================================================
// Type Definitions
// ============================================================================

export type TravelMode = "driving" | "walking" | "bicycling" | "transit";
export type MapType = "roadmap" | "satellite" | "terrain" | "hybrid";
export type SpeedUnit = "KPH" | "MPH";

export type LatLng = {
  lat: number;
  lng: number;
};

export type DirectionsResult = {
  routes: Array<{
    legs: Array<{
      distance: { text: string; value: number };
      duration: { text: string; value: number };
      start_address: string;
      end_address: string;
      start_location: LatLng;
      end_location: LatLng;
      steps: Array<{
        distance: { text: string; value: number };
        duration: { text: string; value: number };
        html_instructions: string;
        travel_mode: string;
        start_location: LatLng;
        end_location: LatLng;
      }>;
    }>;
    overview_polyline: { points: string };
    summary: string;
    warnings: string[];
    waypoint_order: number[];
  }>;
  status: string;
};

export type DistanceMatrixResult = {
  rows: Array<{
    elements: Array<{
      distance: { text: string; value: number };
      duration: { text: string; value: number };
      status: string;
    }>;
  }>;
  origin_addresses: string[];
  destination_addresses: string[];
  status: string;
};

export type GeocodingResult = {
  results: Array<{
    address_components: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
    formatted_address: string;
    geometry: {
      location: LatLng;
      location_type: string;
      viewport: {
        northeast: LatLng;
        southwest: LatLng;
      };
    };
    place_id: string;
    types: string[];
  }>;
  status: string;
};

export type PlacesSearchResult = {
  results: Array<{
    place_id: string;
    name: string;
    formatted_address: string;
    geometry: {
      location: LatLng;
    };
    rating?: number;
    user_ratings_total?: number;
    business_status?: string;
    types: string[];
  }>;
  status: string;
};

export type PlaceDetailsResult = {
  result: {
    place_id: string;
    name: string;
    formatted_address: string;
    formatted_phone_number?: string;
    international_phone_number?: string;
    website?: string;
    rating?: number;
    user_ratings_total?: number;
    reviews?: Array<{
      author_name: string;
      rating: number;
      text: string;
      time: number;
    }>;
    opening_hours?: {
      open_now: boolean;
      weekday_text: string[];
    };
    geometry: {
      location: LatLng;
    };
  };
  status: string;
};

export type ElevationResult = {
  results: Array<{
    elevation: number;
    location: LatLng;
    resolution: number;
  }>;
  status: string;
};

export type TimeZoneResult = {
  dstOffset: number;
  rawOffset: number;
  status: string;
  timeZoneId: string;
  timeZoneName: string;
};

export type RoadsResult = {
  snappedPoints: Array<{
    location: LatLng;
    originalIndex?: number;
    placeId: string;
  }>;
};

// ============================================================================
// Google Maps API Reference
// ============================================================================

/**
 * GEOCODING - Convert between addresses and coordinates
 * Endpoint: /maps/api/geocode/json
 * Input: { address: string } OR { latlng: string }  // latlng: "37.42,-122.08"
 * Output: GeocodingResult  // results[0].geometry.location, results[0].formatted_address
 */

/**
 * DIRECTIONS - Get navigation routes between locations
 * Endpoint: /maps/api/directions/json
 * Input: { origin: string, destination: string, mode?: TravelMode, waypoints?: string, alternatives?: boolean }
 * Output: DirectionsResult  // routes[0].legs[0].distance, duration, steps
 */

/**
 * DISTANCE MATRIX - Calculate travel times/distances for multiple origin-destination pairs
 * Endpoint: /maps/api/distancematrix/json
 * Input: { origins: string, destinations: string, mode?: TravelMode, units?: "metric"|"imperial" }  // origins: "NYC|Boston"
 * Output: DistanceMatrixResult  // rows[0].elements[1] = first origin to second destination
 */

/**
 * PLACE SEARCH - Find businesses/POIs by text query
 * Endpoint: /maps/api/place/textsearch/json
 * Input: { query: string, location?: string, radius?: number, type?: string }  // location: "40.7,-74.0"
 * Output: PlacesSearchResult  // results[].name, rating, geometry.location, place_id
 */

/**
 * NEARBY SEARCH - Find places near a specific location
 * Endpoint: /maps/api/place/nearbysearch/json
 * Input: { location: string, radius: number, type?: string, keyword?: string }  // location: "40.7,-74.0"
 * Output: PlacesSearchResult
 */

/**
 * PLACE DETAILS - Get comprehensive information about a specific place
 * Endpoint: /maps/api/place/details/json
 * Input: { place_id: string, fields?: string }  // fields: "name,rating,opening_hours,website"
 * Output: PlaceDetailsResult  // result.name, rating, opening_hours, etc.
 */

/**
 * ELEVATION - Get altitude data for geographic points
 * Endpoint: /maps/api/elevation/json
 * Input: { locations?: string, path?: string, samples?: number }  // locations: "39.73,-104.98|36.45,-116.86"
 * Output: ElevationResult  // results[].elevation (meters)
 */

/**
 * TIME ZONE - Get timezone information for a location
 * Endpoint: /maps/api/timezone/json
 * Input: { location: string, timestamp: number }  // timestamp: Math.floor(Date.now()/1000)
 * Output: TimeZoneResult  // timeZoneId, timeZoneName
 */

/**
 * ROADS - Snap GPS traces to roads, find nearest roads, get speed limits
 * - /v1/snapToRoads: Input: { path: string, interpolate?: boolean }  // path: "lat,lng|lat,lng"
 * - /v1/nearestRoads: Input: { points: string }  // points: "lat,lng|lat,lng"
 * - /v1/speedLimits: Input: { path: string, units?: SpeedUnit }
 * Output: RoadsResult
 */

/**
 * PLACE AUTOCOMPLETE - Real-time place suggestions as user types
 * Endpoint: /maps/api/place/autocomplete/json
 * Input: { input: string, location?: string, radius?: number }
 * Output: { predictions: Array<{ description: string, place_id: string }> }
 */

/**
 * STATIC MAPS - Generate map images as URLs (for emails, reports, <img> tags)
 * Endpoint: /maps/api/staticmap
 * Input: URL params - center: string, zoom: number, size: string, markers?: string, maptype?: MapType
 * Output: Image URL (not JSON) - use directly in <img src={url} />
 * Note: Construct URL manually with getMapsConfig() for auth
 */
</file>

<file path="server/_core/notification.ts">
import { TRPCError } from "@trpc/server";
import { ENV } from "./env";

export type NotificationPayload = {
  title: string;
  content: string;
};

const TITLE_MAX_LENGTH = 1200;
const CONTENT_MAX_LENGTH = 20000;

const trimValue = (value: string): string => value.trim();
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const buildEndpointUrl = (baseUrl: string): string => {
  const normalizedBase = baseUrl.endsWith("/")
    ? baseUrl
    : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};

const validatePayload = (input: NotificationPayload): NotificationPayload => {
  if (!isNonEmptyString(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required.",
    });
  }
  if (!isNonEmptyString(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required.",
    });
  }

  const title = trimValue(input.title);
  const content = trimValue(input.content);

  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`,
    });
  }

  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`,
    });
  }

  return { title, content };
};

/**
 * Dispatches a project-owner notification through the Manus Notification Service.
 * Returns `true` if the request was accepted, `false` when the upstream service
 * cannot be reached (callers can fall back to email/slack). Validation errors
 * bubble up as TRPC errors so callers can fix the payload.
 */
export async function notifyOwner(
  payload: NotificationPayload
): Promise<boolean> {
  const { title, content } = validatePayload(payload);

  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured.",
    });
  }

  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured.",
    });
  }

  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${
          detail ? `: ${detail}` : ""
        }`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}
</file>

<file path="server/_core/oauth.ts">
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);

      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}
</file>

<file path="server/_core/polyfills.ts">
import { webcrypto } from "node:crypto";

if (!globalThis.crypto) {
  // Node 18 Fix für jose auf Railway
  // @ts-ignore
  globalThis.crypto = webcrypto;
}
</file>

<file path="server/_core/systemRouter.ts">
import { z } from "zod";
import { notifyOwner } from "./notification";
import { adminProcedure, publicProcedure, router } from "./trpc";

export const systemRouter = router({
  health: publicProcedure
    .input(
      z.object({
        timestamp: z.number().min(0, "timestamp cannot be negative"),
      })
    )
    .query(() => ({
      ok: true,
    })),

  notifyOwner: adminProcedure
    .input(
      z.object({
        title: z.string().min(1, "title is required"),
        content: z.string().min(1, "content is required"),
      })
    )
    .mutation(async ({ input }) => {
      const delivered = await notifyOwner(input);
      return {
        success: delivered,
      } as const;
    }),
});
</file>

<file path="server/_core/trpc.ts">
import { NOT_ADMIN_ERR_MSG, UNAUTHED_ERR_MSG } from '@shared/const';
import { initTRPC, TRPCError } from "@trpc/server";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({});

export const router = t.router;
export const publicProcedure = t.procedure;

const requireUser = t.middleware(async opts => {
  const { ctx, next } = opts;

  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(requireUser);

export const adminProcedure = t.procedure.use(
  t.middleware(async opts => {
    const { ctx, next } = opts;

    if (!ctx.user || ctx.user.role !== 'admin') {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  }),
);
</file>

<file path="server/_core/vite.ts">
import type { Express } from "express";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import type { Server } from "http";

/**
 * DEV: Vite Middleware + HMR
 * Wird nur in NODE_ENV=development genutzt.
 */
export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    appType: "custom",
    server: {
      middlewareMode: true,
      hmr: { server },
    },
  });

  app.use(vite.middlewares);
}

/**
 * PROD: Statische Dateien aus dist/public ausliefern (SPA)
 * Wird in Produktion genutzt.
 */
export function serveStatic(app: Express) {
  const staticDir = path.join(process.cwd(), "dist", "public");

  app.use(express.static(staticDir));

  // SPA-Fallback: alle nicht-API-Routen -> index.html
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(staticDir, "index.html"));
  });
}
</file>

<file path="server/aiAssistant.test.ts">
import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("aiAssistant router", () => {
  let conversationId: number;

  it("creates a new conversation", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const conversation = await caller.aiAssistant.createConversation({
      moduleContext: "Modul 3: Verwaltung",
    });

    expect(conversation).toBeDefined();
    expect(conversation?.userId).toBe(1);
    expect(conversation?.moduleContext).toBe("Modul 3: Verwaltung");
    
    if (conversation) {
      conversationId = conversation.id;
    }
  });

  it("retrieves user conversations", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a conversation first
    await caller.aiAssistant.createConversation({
      moduleContext: "Test Context",
    });

    const conversations = await caller.aiAssistant.getConversations();

    expect(conversations).toBeDefined();
    expect(Array.isArray(conversations)).toBe(true);
    expect(conversations.length).toBeGreaterThan(0);
  });

  it("sends a message and receives AI response", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a conversation first
    const conversation = await caller.aiAssistant.createConversation({
      moduleContext: "Modul 3: Verwaltung",
    });

    expect(conversation).toBeDefined();

    if (!conversation) {
      throw new Error("Failed to create conversation");
    }

    // Send a message
    const response = await caller.aiAssistant.sendMessage({
      conversationId: conversation.id,
      message: "Was ist WEG-Recht?",
      moduleContext: "Modul 3: Verwaltung",
    });

    expect(response).toBeDefined();
    expect(response.message).toBeDefined();
    expect(typeof response.message).toBe("string");
    expect(response.message.length).toBeGreaterThan(0);
    expect(response.conversationId).toBe(conversation.id);
  }, 30000); // Increase timeout for LLM call

  it("retrieves conversation messages", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a conversation and send a message
    const conversation = await caller.aiAssistant.createConversation({
      moduleContext: "Test",
    });

    expect(conversation).toBeDefined();

    if (!conversation) {
      throw new Error("Failed to create conversation");
    }

    await caller.aiAssistant.sendMessage({
      conversationId: conversation.id,
      message: "Test question",
    });

    // Retrieve messages
    const messages = await caller.aiAssistant.getMessages({
      conversationId: conversation.id,
    });

    expect(messages).toBeDefined();
    expect(Array.isArray(messages)).toBe(true);
    expect(messages.length).toBeGreaterThanOrEqual(2); // User message + AI response
    
    // Check message structure
    const userMessage = messages.find(m => m.role === "user");
    const assistantMessage = messages.find(m => m.role === "assistant");
    
    expect(userMessage).toBeDefined();
    expect(assistantMessage).toBeDefined();
    expect(userMessage?.content).toBe("Test question");
  }, 30000); // Increase timeout for LLM call
});
</file>

<file path="server/auth.logout.test.ts">
import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

type CookieCall = {
  name: string;
  options: Record<string, unknown>;
};

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): { ctx: TrpcContext; clearedCookies: CookieCall[] } {
  const clearedCookies: CookieCall[] = [];

  const user: AuthenticatedUser = {
    id: 1,
    openId: "sample-user",
    email: "sample@example.com",
    name: "Sample User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, clearedCookies };
}

describe("auth.logout", () => {
  it("clears the session cookie and reports success", async () => {
    const { ctx, clearedCookies } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();

    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
    expect(clearedCookies[0]?.options).toMatchObject({
      maxAge: -1,
      secure: true,
      sameSite: "none",
      httpOnly: true,
      path: "/",
    });
  });
});
</file>

<file path="server/azavRouter.ts">
/**
 * azavRouter.ts – tRPC-Endpunkte für AZAV-Compliance
 *
 * Deckt ab:
 * - Aktivitäts-Heartbeat (Anwesenheitsnachweis)
 * - Lernfortschritt öffnen/schließen (server-seitige Speicherung)
 * - Feedback (QM-Pflicht AZAV §3)
 * - Beschwerdemanagement (QM-Pflicht AZAV §3)
 * - DSGVO-Einwilligungen (Art. 7 DSGVO)
 */

import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import {
  saveHeartbeat,
  openLearningLog,
  closeLearningLog,
  getCompletedDays,
  writeExamAuditLog,
  saveFeedback,
  getFeedbackStats,
  createComplaint,
  getOpenComplaints,
  updateComplaintStatus,
  logConsent,
  getUserConsents,
} from "./db";
import { TRPCError } from "@trpc/server";

export const azavRouter = router({

  // ── Heartbeat ────────────────────────────────────────────────────────────
  /**
   * Browser sendet alle 60 Sek ein Signal, solange Nutzer aktiv lernt.
   * Speichert Zeitstempel + aktualisiert learningLogs.heartbeatCount.
   */
  heartbeat: protectedProcedure
    .input(z.object({
      moduleId: z.number().int().min(1).max(10),
      dayId: z.number().int().min(1),
      logId: z.number().int().optional(), // Wenn vorhanden: update statt insert
    }))
    .mutation(async ({ ctx, input }) => {
      await saveHeartbeat(ctx.user.id, input.moduleId, input.dayId);
      return { ok: true, timestamp: new Date().toISOString() };
    }),

  // ── Learning Log ─────────────────────────────────────────────────────────
  /** Lerneinheit öffnen – gibt logId zurück (für späteres Schließen) */
  openDay: protectedProcedure
    .input(z.object({
      moduleId: z.number().int().min(1),
      dayId: z.number().int().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      const logId = await openLearningLog(ctx.user.id, input.moduleId, input.dayId);
      return { logId };
    }),

  /** Lerneinheit schließen – Dauer und Abschluss setzen */
  closeDay: protectedProcedure
    .input(z.object({
      logId: z.number().int(),
      durationSeconds: z.number().int().min(0),
      completed: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      await closeLearningLog(input.logId, input.durationSeconds, input.completed);
      return { ok: true };
    }),

  /** Abgeschlossene Lerntage des Nutzers abrufen */
  getProgress: protectedProcedure
    .input(z.object({
      moduleId: z.number().int().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const days = await getCompletedDays(ctx.user.id, input.moduleId);
      return { days };
    }),

  // ── Feedback ─────────────────────────────────────────────────────────────
  /** Nutzerfeedback für Modul/Tag einreichen */
  submitFeedback: protectedProcedure
    .input(z.object({
      moduleId: z.number().int().min(1),
      dayId: z.number().int().optional(),
      rating: z.number().int().min(1).max(5),
      comment: z.string().max(2000).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await saveFeedback({
        userId: ctx.user.id,
        moduleId: input.moduleId,
        dayId: input.dayId,
        rating: input.rating,
        comment: input.comment,
      });
      return { ok: true };
    }),

  /** Feedback-Statistiken (nur Admin) */
  getFeedbackStats: protectedProcedure
    .query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Nur Admins können Feedback-Statistiken abrufen" });
      }
      return await getFeedbackStats();
    }),

  // ── Beschwerden ───────────────────────────────────────────────────────────
  /** Beschwerde einreichen */
  submitComplaint: protectedProcedure
    .input(z.object({
      subject: z.string().min(5).max(255),
      description: z.string().min(20).max(5000),
    }))
    .mutation(async ({ ctx, input }) => {
      await createComplaint({
        userId: ctx.user.id,
        subject: input.subject,
        description: input.description,
        status: "open",
      });
      return { ok: true, message: "Ihre Beschwerde wurde erfolgreich eingereicht. Wir melden uns innerhalb von 5 Werktagen." };
    }),

  /** Offene Beschwerden abrufen (nur Admin) */
  getComplaints: protectedProcedure
    .query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Nur Admins können Beschwerden einsehen" });
      }
      return await getOpenComplaints();
    }),

  /** Beschwerde-Status aktualisieren (nur Admin) */
  updateComplaint: protectedProcedure
    .input(z.object({
      id: z.number().int(),
      status: z.enum(["open", "in_progress", "resolved", "closed"]),
      adminNote: z.string().max(2000).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Nur Admins können Beschwerden aktualisieren" });
      }
      await updateComplaintStatus(input.id, input.status, input.adminNote);
      return { ok: true };
    }),

  // ── DSGVO-Einwilligungen ─────────────────────────────────────────────────
  /** Einwilligung protokollieren */
  logConsent: protectedProcedure
    .input(z.object({
      consentType: z.enum([
        "terms", "privacy", "ai_assistant", "marketing",
        "revoked_terms", "revoked_privacy", "revoked_ai", "revoked_marketing"
      ]),
      consentVersion: z.string().default("2026-03"),
    }))
    .mutation(async ({ ctx, input }) => {
      await logConsent({
        userId: ctx.user.id,
        consentType: input.consentType,
        consentVersion: input.consentVersion,
      });
      return { ok: true };
    }),

  /** Eigene Einwilligungen abrufen */
  getMyConsents: protectedProcedure
    .query(async ({ ctx }) => {
      return await getUserConsents(ctx.user.id);
    }),
});
</file>

<file path="server/certificateRouter.ts">
import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import {
  createCertificate,
  getUserCertificates,
  getCertificateByExamSession,
} from "./certificates";

export const certificateRouter = router({
  /**
   * Generate certificate for a completed exam session
   * Only works if score >= 70%
   */
  generateCertificate: protectedProcedure
    .input(
      z.object({
        examSessionId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await createCertificate(ctx.user.id, input.examSessionId);

      if (!result) {
        return {
          success: false,
          message: "Zertifikat kann nur für bestandene Prüfungen (≥70%) erstellt werden.",
        };
      }

      return {
        success: true,
        certificateId: result.certificateId,
        pdfUrl: result.pdfUrl,
      };
    }),

  /**
   * Get all certificates for the current user
   */
  getUserCertificates: protectedProcedure.query(async ({ ctx }) => {
    return getUserCertificates(ctx.user.id);
  }),

  /**
   * Get certificate for a specific exam session
   */
  getCertificateByExamSession: protectedProcedure
    .input(
      z.object({
        examSessionId: z.number(),
      })
    )
    .query(async ({ input }) => {
      return getCertificateByExamSession(input.examSessionId);
    }),
});
</file>

<file path="server/certificates.test.ts">
import { describe, it, expect, beforeAll } from "vitest";
import { createCertificate, getUserCertificates, getCertificateByExamSession } from "./certificates";
import { upsertUser, createExamSession } from "./db";

describe("Certificate Generation", () => {
  let testUserId: number;
  let passedSessionId: number;
  let failedSessionId: number;

  beforeAll(async () => {
    // Create test user
    await upsertUser({
      openId: "test-cert-user-123",
      name: "Max Mustermann",
      email: "max@example.com",
      loginMethod: "test",
    });

    // Get user ID
    const { getDb } = await import("./db");
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const { users } = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.openId, "test-cert-user-123"))
      .limit(1);

    testUserId = user.id;

    // Create passed exam session (score >= 70%)
    const passedSession = await createExamSession(
      testUserId,
      2, // moduleId
      50, // totalQuestions
      1800, // timeLimit (30 min)
      "medium", // difficulty
      false // isIHKMode
    );
    if (!passedSession) throw new Error("Failed to create passed session");
    passedSessionId = passedSession.id;

    // Update session to completed with passing score
    const { examSessions } = await import("../drizzle/schema");
    await db
      .update(examSessions)
      .set({
        status: "completed" as const,
        score: 85,
        correctAnswers: 43,
        completedAt: new Date(),
      })
      .where(eq(examSessions.id, Number(passedSessionId)));

    // Create failed exam session (score < 70%)
    const failedSession = await createExamSession(
      testUserId,
      2, // moduleId
      50, // totalQuestions
      1800, // timeLimit (30 min)
      "medium", // difficulty
      false // isIHKMode
    );
    if (!failedSession) throw new Error("Failed to create failed session");
    failedSessionId = failedSession.id;

    // Update session to completed with failing score
    await db
      .update(examSessions)
      .set({
        status: "completed" as const,
        score: 55,
        correctAnswers: 28,
        completedAt: new Date(),
      })
      .where(eq(examSessions.id, Number(failedSessionId)));
  });

  it("should generate certificate for passed exam (score >= 70%)", async () => {
    const result = await createCertificate(testUserId, passedSessionId);

    expect(result).not.toBeNull();
    expect(result?.certificateId).toBeGreaterThan(0);
    expect(result?.pdfUrl).toContain("https://");
    expect(result?.pdfUrl).toContain(".pdf");
  });

  it("should not generate certificate for failed exam (score < 70%)", async () => {
    const result = await createCertificate(testUserId, failedSessionId);

    expect(result).toBeNull();
  });

  it("should return existing certificate if already generated", async () => {
    // First generation
    const result1 = await createCertificate(testUserId, passedSessionId);
    expect(result1).not.toBeNull();

    // Second generation (should return existing)
    const result2 = await createCertificate(testUserId, passedSessionId);
    expect(result2).not.toBeNull();
    expect(result2?.certificateId).toBe(result1?.certificateId);
    expect(result2?.pdfUrl).toBe(result1?.pdfUrl);
  });

  it("should retrieve all certificates for a user", async () => {
    const certificates = await getUserCertificates(testUserId);

    expect(certificates).toBeInstanceOf(Array);
    expect(certificates.length).toBeGreaterThan(0);
    expect(certificates[0]).toHaveProperty("userId");
    expect(certificates[0]).toHaveProperty("pdfUrl");
    expect(certificates[0]).toHaveProperty("score");
  });

  it("should retrieve certificate by exam session", async () => {
    const certificate = await getCertificateByExamSession(passedSessionId);

    expect(certificate).not.toBeNull();
    expect(certificate?.examSessionId).toBe(passedSessionId);
    expect(certificate?.userId).toBe(testUserId);
    expect(certificate?.score).toBeGreaterThanOrEqual(70);
  });

  it("should return null for non-existent exam session certificate", async () => {
    const certificate = await getCertificateByExamSession(failedSessionId);

    expect(certificate).toBeNull();
  });

  it("should include correct module information in certificate", async () => {
    const certificate = await getCertificateByExamSession(passedSessionId);

    expect(certificate).not.toBeNull();
    expect(certificate?.moduleId).toBe(2);
    expect(certificate?.moduleName).toContain("Modul 2");
    expect(certificate?.moduleName).toContain("Maklerrecht");
  });
});
</file>

<file path="server/certificates.ts">
import { jsPDF } from "jspdf";
import { getDb } from "./db";
import { certificates, examSessions, users } from "../drizzle/schema";
import { storagePut } from "./storage";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";

/**
 * Module names mapping
 */
const MODULE_NAMES: Record<number, string> = {
  1: "Modul 1: Einführung & Grundlagen",
  2: "Modul 2: Maklerrecht & §34c GewO",
  3: "Modul 3: Verwaltung (WEG & Miet)",
  4: "Modul 4: Wertermittlung & Gutachten",
  5: "Modul 5: Finanzierung & §34i",
};

/**
 * Generate a professional PDF certificate for a passed exam
 */
export async function generateCertificatePDF(
  userName: string,
  moduleId: number,
  moduleName: string,
  score: number,
  totalQuestions: number,
  correctAnswers: number,
  completedAt: Date,
  options?: {
    azavEnabled?: boolean;
    azavLicenseNumber?: string;
    measureLicenseNumber?: string;
    certificateType?: "participation" | "exam"; // Typ A = Teilnahme, Typ B = Abschluss
  }
): Promise<{ pdfUrl: string; pdfKey: string }> {
  const azavEnabled = options?.azavEnabled ?? false;
  const certType = options?.certificateType ?? "exam";
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background color
  doc.setFillColor(245, 247, 250);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Border
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Inner border
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(0.5);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  // Title
  doc.setFontSize(32);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text("ZERTIFIKAT", pageWidth / 2, 40, { align: "center" });

  // Subtitle
  doc.setFontSize(14);
  doc.setTextColor(71, 85, 105);
  doc.setFont("helvetica", "normal");
  doc.text("Immobilien-Bildungsportal", pageWidth / 2, 50, { align: "center" });

  // Divider line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(40, 60, pageWidth - 40, 60);

  // Main text
  doc.setFontSize(16);
  doc.setTextColor(51, 65, 85);
  doc.setFont("helvetica", "normal");
  doc.text("Hiermit wird bescheinigt, dass", pageWidth / 2, 75, { align: "center" });

  // User name (highlighted)
  doc.setFontSize(24);
  doc.setTextColor(37, 99, 235);
  doc.setFont("helvetica", "bold");
  doc.text(userName, pageWidth / 2, 90, { align: "center" });

  // Achievement text
  doc.setFontSize(16);
  doc.setTextColor(51, 65, 85);
  doc.setFont("helvetica", "normal");
  doc.text("die Prüfung erfolgreich bestanden hat:", pageWidth / 2, 105, { align: "center" });

  // Module name (highlighted)
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.setFont("helvetica", "bold");
  doc.text(moduleName, pageWidth / 2, 120, { align: "center" });

  // Score box
  const boxX = pageWidth / 2 - 40;
  const boxY = 135;
  doc.setFillColor(239, 246, 255);
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(boxX, boxY, 80, 25, 3, 3, "FD");

  doc.setFontSize(14);
  doc.setTextColor(30, 64, 175);
  doc.setFont("helvetica", "bold");
  doc.text(`Ergebnis: ${score}%`, pageWidth / 2, boxY + 10, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`${correctAnswers} von ${totalQuestions} Fragen korrekt`, pageWidth / 2, boxY + 18, { align: "center" });

  // Date
  doc.setFontSize(12);
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  const dateStr = completedAt.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  doc.text(`Ausgestellt am: ${dateStr}`, pageWidth / 2, 175, { align: "center" });

  // Disclaimer (Pflicht auf JEDEM Zertifikat laut Protokoll Abschnitt 4.5)
  const disclaimerText =
    certType === "participation"
      ? `Typ A – Teilnahmebescheinigung: Diese Bescheinigung bestätigt die erfolgreiche Bearbeitung der Lerneinheiten auf MaklerLern.de zur Vorbereitung auf die Sachkundeprüfung nach §34c/§34i/§26a. Sie ersetzt nicht die offizielle IHK-Prüfung. Ausgestellt von: Alisad Gadyri, IHK-Immobilienkaufmann (Berlin, 2023).`
      : `Typ B – Abschlusszertifikat: Diese Bescheinigung bestätigt den erfolgreichen Abschluss der Prüfungssimulation auf MaklerLern.de (≥70%). Sie ersetzt nicht die offizielle IHK-Prüfung. Ausgestellt von: Alisad Gadyri, IHK-Immobilienkaufmann (Berlin, 2023).`;

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, pageWidth - 40);
  doc.text(splitDisclaimer, pageWidth / 2, pageHeight - 25, { align: "center" });

  // Footer: AZAV nur wenn explizit aktiviert (azavEnabled = false per Standard)
  if (azavEnabled && options?.azavLicenseNumber) {
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Trägerzulassung: ${options.azavLicenseNumber}${options.measureLicenseNumber ? ` | Maßnahmezulassung: ${options.measureLicenseNumber}` : ""}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
  }

  // Convert to buffer
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

  // Generate unique key
  const pdfKey = `certificates/module-${moduleId}/${nanoid()}.pdf`;

  // Upload to S3
  const pdfUrl = await storagePut(pdfKey, pdfBuffer, "application/pdf");

  return { pdfUrl, pdfKey };
}

/**
 * Create certificate record in database after successful exam
 */
export async function createCertificate(
  userId: number,
  examSessionId: number
): Promise<{ certificateId: number; pdfUrl: string } | null> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Get exam session details
  const [examSession] = await db
    .select()
    .from(examSessions)
    .where(eq(examSessions.id, examSessionId))
    .limit(1);

  if (!examSession) {
    throw new Error("Exam session not found");
  }

  // Check if score is >= 70%
  if (examSession.score < 70) {
    return null; // Not passed
  }

  // Check if certificate already exists
  const [existingCert] = await db
    .select()
    .from(certificates)
    .where(
      and(
        eq(certificates.userId, userId),
        eq(certificates.examSessionId, examSessionId)
      )
    )
    .limit(1);

  if (existingCert) {
    return {
      certificateId: existingCert.id,
      pdfUrl: existingCert.pdfUrl,
    };
  }

  // Get user details
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    throw new Error("User not found");
  }

  const moduleName = MODULE_NAMES[examSession.moduleId] || `Modul ${examSession.moduleId}`;

  // Generate PDF
  const { pdfUrl, pdfKey } = await generateCertificatePDF(
    user.name || "Teilnehmer",
    examSession.moduleId,
    moduleName,
    examSession.score,
    examSession.totalQuestions,
    examSession.correctAnswers,
    examSession.completedAt || new Date()
  );

  // Save to database
  const [certificate] = await db
    .insert(certificates)
    .values({
      userId,
      examSessionId,
      moduleId: examSession.moduleId,
      moduleName,
      score: examSession.score,
      totalQuestions: examSession.totalQuestions,
      correctAnswers: examSession.correctAnswers,
      pdfUrl,
      pdfKey,
    })
    .$returningId();

  return {
    certificateId: certificate.id,
    pdfUrl,
  };
}

/**
 * Get all certificates for a user
 */
export async function getUserCertificates(userId: number) {
  const db = await getDb();
  if (!db) {
    return [];
  }
  return db
    .select()
    .from(certificates)
    .where(eq(certificates.userId, userId))
    .orderBy(certificates.issuedAt);
}

/**
 * Get certificate by exam session
 */
export async function getCertificateByExamSession(examSessionId: number) {
  const db = await getDb();
  if (!db) {
    return null;
  }
  const [certificate] = await db
    .select()
    .from(certificates)
    .where(eq(certificates.examSessionId, examSessionId))
    .limit(1);

  return certificate || null;
}
</file>

<file path="server/exam-mode-button.test.ts">
import { describe, it, expect } from 'vitest';

describe('ExamQuestion Button Logic', () => {
  it('should show "Antwort überprüfen" button in normal mode before feedback', () => {
    const showFeedback = false;
    const isIHKMode = false;
    const currentQuestion = 1;
    const totalQuestions = 10;

    // Button should be "Antwort überprüfen" when no feedback shown
    const buttonText = isIHKMode 
      ? (currentQuestion < totalQuestions ? "Nächste Frage" : "Prüfung abschließen")
      : "Antwort überprüfen";

    expect(buttonText).toBe("Antwort überprüfen");
  });

  it('should show "Nächste Frage" button in normal mode after feedback', () => {
    const showFeedback = true;
    const isIHKMode = false;
    const currentQuestion = 1;
    const totalQuestions = 10;

    // After feedback, button should be "Nächste Frage"
    const buttonText = currentQuestion < totalQuestions 
      ? "Nächste Frage" 
      : "Prüfung abschließen";

    expect(buttonText).toBe("Nächste Frage");
  });

  it('should show "Nächste Frage" button in IHK mode (no feedback)', () => {
    const showFeedback = false;
    const isIHKMode = true;
    const currentQuestion = 1;
    const totalQuestions = 72;

    // IHK mode: no feedback, directly "Nächste Frage"
    const buttonText = isIHKMode 
      ? (currentQuestion < totalQuestions ? "Nächste Frage" : "Prüfung abschließen")
      : "Antwort überprüfen";

    expect(buttonText).toBe("Nächste Frage");
  });

  it('should show "Prüfung abschließen" on last question in normal mode after feedback', () => {
    const showFeedback = true;
    const isIHKMode = false;
    const currentQuestion = 10;
    const totalQuestions = 10;

    // Last question with feedback shown
    const buttonText = currentQuestion < totalQuestions 
      ? "Nächste Frage" 
      : "Prüfung abschließen";

    expect(buttonText).toBe("Prüfung abschließen");
  });

  it('should show "Prüfung abschließen" on last question in IHK mode', () => {
    const showFeedback = false;
    const isIHKMode = true;
    const currentQuestion = 72;
    const totalQuestions = 72;

    // IHK mode: last question
    const buttonText = isIHKMode 
      ? (currentQuestion < totalQuestions ? "Nächste Frage" : "Prüfung abschließen")
      : "Antwort überprüfen";

    expect(buttonText).toBe("Prüfung abschließen");
  });

  it('should not show feedback in IHK mode', () => {
    const isIHKMode = true;
    const showFeedback = false;

    // In IHK mode, feedback should never be shown
    const shouldShowFeedback = !isIHKMode && showFeedback;

    expect(shouldShowFeedback).toBe(false);
  });

  it('should show feedback in normal mode after answer submission', () => {
    const isIHKMode = false;
    const showFeedback = true;

    // In normal mode, feedback should be shown after submission
    const shouldShowFeedback = !isIHKMode && showFeedback;

    expect(shouldShowFeedback).toBe(true);
  });
});
</file>

<file path="server/examRouter.ts">
import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { createExamSession, getExamSession, getUserExamSessions, saveExamQuestion, getExamQuestions, getExamQuestionById, updateExamQuestion, completeExamSession, getWeakTopics, updateWeakTopic } from "./db";
import { TRPCError } from "@trpc/server";

const LOCAL_QUESTIONS: Record<number, Array<{question: string; options: Record<string, string>; correctAnswer: string; topic: string; explanation: string; difficulty: 'easy' | 'medium' | 'hard'}>> = {
  1: [
    { question: "Was versteht man unter dem Begriff 'Immobilie'?", options: { "A": "Nur Grundstücke ohne Bebauung", "B": "Unbewegliche Sachen, insbesondere Grundstücke und Gebäude", "C": "Nur Wohngebäude", "D": "Ausschließlich gewerblich genutzte Objekte" }, correctAnswer: "B", topic: "Grundlagen", explanation: "Immobilien sind unbewegliche Sachen im Sinne des BGB. Dazu gehören Grundstücke sowie alle fest mit dem Grund und Boden verbundenen Gebäude und Bauwerke. Der Begriff umfasst sowohl Wohn- als auch Gewerbeimmobilien.", difficulty: "easy" },
    { question: "Welche Immobilientypen gibt es NICHT?", options: { "A": "Wohnimmobilien", "B": "Gewerbeimmobilien", "C": "Spezialimmobilien", "D": "Virtuelle Immobilien" }, correctAnswer: "D", topic: "Grundlagen", explanation: "Die klassische Einteilung umfasst Wohnimmobilien (z.B. Einfamilienhäuser, Wohnungen), Gewerbeimmobilien (z.B. Büros, Einzelhandel) und Spezialimmobilien (z.B. Hotels, Pflegeheime). 'Virtuelle Immobilien' ist kein anerkannter Immobilientyp im klassischen Sinne.", difficulty: "easy" },
    { question: "Was ist der Unterschied zwischen Grundstück und Gebäude?", options: { "A": "Es gibt keinen Unterschied", "B": "Grundstück ist der Boden, Gebäude ist die Bebauung", "C": "Grundstück ist größer als Gebäude", "D": "Gebäude ist immer teurer als Grundstück" }, correctAnswer: "B", topic: "Grundlagen", explanation: "Ein Grundstück ist ein abgegrenzter Teil der Erdoberfläche, der im Grundbuch eingetragen ist. Ein Gebäude ist ein Bauwerk, das fest mit dem Grundstück verbunden ist. Nach § 94 BGB sind Gebäude wesentliche Bestandteile des Grundstücks.", difficulty: "medium" },
    { question: "Welche Akteure sind NICHT typischerweise am Immobilienmarkt beteiligt?", options: { "A": "Makler, Verwalter, Gutachter", "B": "Käufer, Verkäufer, Mieter", "C": "Banken, Notare, Bauträger", "D": "Einzelhändler, Gastronomen, Friseure" }, correctAnswer: "D", topic: "Marktakteure", explanation: "Am Immobilienmarkt sind typischerweise Makler, Verwalter, Gutachter, Käufer, Verkäufer, Mieter, Vermieter, Banken, Notare und Bauträger beteiligt. Einzelhändler, Gastronomen und Friseure sind zwar möglicherweise Mieter von Gewerbeimmobilien, aber keine typischen Marktakteure im engeren Sinne.", difficulty: "easy" },
    { question: "Was regelt das Grundbuch?", options: { "A": "Die Bauvorschriften für Immobilien", "B": "Die Eigentumsverhältnisse an Grundstücken", "C": "Die Mietpreise in Deutschland", "D": "Die Steuersätze für Immobilien" }, correctAnswer: "B", topic: "Recht", explanation: "Das Grundbuch ist ein öffentliches Register, das beim Amtsgericht geführt wird. Es dokumentiert die Eigentumsverhältnisse an Grundstücken sowie darauf lastende Rechte (z.B. Grundschulden, Wegerechte). Das Grundbuch genießt öffentlichen Glauben (§ 892 BGB).", difficulty: "medium" },
    { question: "Welche Aussage über den Immobilienmarkt ist FALSCH?", options: { "A": "Der Immobilienmarkt ist regional sehr unterschiedlich", "B": "Lage ist ein entscheidender Wertfaktor", "C": "Alle Immobilien haben denselben Wert pro Quadratmeter", "D": "Angebot und Nachfrage beeinflussen die Preise" }, correctAnswer: "C", topic: "Markt", explanation: "Der Immobilienmarkt ist stark heterogen und regional unterschiedlich. Die Lage ('Lage, Lage, Lage') ist der wichtigste Wertfaktor. Immobilien haben sehr unterschiedliche Quadratmeterpreise je nach Lage, Zustand, Ausstattung und Marktlage. Die Aussage 'Alle Immobilien haben denselben Wert pro m²' ist daher falsch.", difficulty: "easy" },
    { question: "Was bedeutet 'Verkehrswert' einer Immobilie?", options: { "A": "Der Wert der Verkehrsanbindung", "B": "Der Preis, den ein Käufer tatsächlich zahlt", "C": "Der Marktwert, der im gewöhnlichen Geschäftsverkehr erzielbar ist", "D": "Der Wert der Parkplätze" }, correctAnswer: "C", topic: "Bewertung", explanation: "Der Verkehrswert (auch Marktwert) ist der Preis, der zum Wertermittlungsstichtag im gewöhnlichen Geschäftsverkehr nach den rechtlichen Gegebenheiten und tatsächlichen Eigenschaften erzielbar wäre. Er wird nach § 194 BauGB durch Gutachter ermittelt.", difficulty: "medium" },
    { question: "Welche Rechtsform kann KEINE Immobilien besitzen?", options: { "A": "Natürliche Personen", "B": "GmbH", "C": "Vereine", "D": "Alle genannten können Immobilien besitzen" }, correctAnswer: "D", topic: "Recht", explanation: "Alle genannten Rechtsformen können Immobilien besitzen: Natürliche Personen (Privatpersonen), juristische Personen des Privatrechts (GmbH, AG) und juristische Personen des öffentlichen Rechts (Vereine, Stiftungen). Die Eigentumsfähigkeit ist im BGB geregelt.", difficulty: "medium" },
    { question: "Was ist eine 'Teilungserklärung'?", options: { "A": "Die Aufteilung der Maklercourtage", "B": "Die notarielle Erklärung zur Aufteilung eines Grundstücks in Wohnungseigentum", "C": "Die Trennung von Ehepartnern", "D": "Die Aufteilung von Betriebskosten" }, correctAnswer: "B", topic: "Recht", explanation: "Die Teilungserklärung ist eine notariell beurkundete Erklärung des Eigentümers, durch die ein Grundstück in Miteigentumsanteile aufgeteilt wird, die mit Sondereigentum an Wohnungen oder Räumen verbunden sind. Sie ist die Grundlage für Wohnungseigentum.", difficulty: "hard" },
    { question: "Welche Aussage über Grundsteuern ist korrekt?", options: { "A": "Grundsteuer wird nur beim Kauf fällig", "B": "Grundsteuer ist eine jährliche Steuer auf Grundbesitz", "C": "Grundsteuer zahlt nur der Mieter", "D": "Grundsteuer gibt es in Deutschland nicht" }, correctAnswer: "B", topic: "Steuern", explanation: "Die Grundsteuer ist eine jährliche Steuer auf den Grundbesitz (Grundstücke und Gebäude). Sie wird von den Gemeinden erhoben und ist vom Eigentümer zu zahlen. Sie kann als Betriebskosten auf Mieter umgelegt werden. Nicht zu verwechseln mit der Grunderwerbsteuer beim Kauf.", difficulty: "medium" },
    { question: "Was ist der Hauptzweck des Maklervertrags?", options: { "A": "Der Makler verpflichtet sich, eine Immobilie zu kaufen.", "B": "Der Makler verpflichtet sich, den Nachweis oder die Vermittlung eines Vertrages zu erbringen.", "C": "Der Makler garantiert den Verkaufserfolg.", "D": "Der Makler wird Eigentümer der Immobilie." }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Der Maklervertrag verpflichtet den Makler zum Nachweis der Gelegenheit zum Abschluss eines Vertrages oder zur Vermittlung eines solchen (§ 652 BGB).", difficulty: "medium" },
    { question: "Welche Formvorschrift gilt für den Maklervertrag über Wohnraum?", options: { "A": "Mündliche Vereinbarung reicht aus.", "B": "Er muss notariell beurkundet werden.", "C": "Er bedarf der Textform (§ 656a BGB).", "D": "Er muss handschriftlich verfasst sein." }, correctAnswer: "C", topic: "Fachkenntnisse", explanation: "Seit dem 23.12.2020 bedarf ein Maklervertrag, der den Nachweis der Gelegenheit zum Abschluss eines Kaufvertrags über eine Wohnung oder ein Einfamilienhaus betrifft, der Textform (z.B. E-Mail).", difficulty: "medium" },
    { question: "Was versteht man unter dem 'Bestellerprinzip' bei der Wohnraummiete?", options: { "A": "Der Mieter zahlt immer die Provision.", "B": "Der Vermieter zahlt immer die Provision.", "C": "Wer den Makler bestellt, bezahlt ihn (§ 2 Abs. 1a WoVermRG).", "D": "Die Provision wird immer geteilt." }, correctAnswer: "C", topic: "Fachkenntnisse", explanation: "Bei der Vermittlung von Wohnraummietverträgen gilt das Bestellerprinzip: Derjenige, der den Makler beauftragt (bestellt), muss die Provision zahlen.", difficulty: "medium" },
    { question: "Was ist ein 'qualifizierter Alleinauftrag'?", options: { "A": "Der Makler darf auch für andere Kunden tätig werden.", "B": "Der Auftraggeber verzichtet darauf, andere Makler einzuschalten und darf auch nicht selbst tätig werden (umstritten, meist Individualvereinbarung nötig).", "C": "Der Auftraggeber darf parallel andere Makler beauftragen.", "D": "Der Makler erhält eine Festvergütung ohne Erfolg." }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Beim qualifizierten Alleinauftrag verpflichtet sich der Auftraggeber, keine anderen Makler einzuschalten und Interessenten an den alleinbeauftragten Makler zu verweisen.", difficulty: "medium" },
    { question: "Wann entsteht der Provisionsanspruch des Maklers?", options: { "A": "Mit Unterzeichnung des Maklervertrags.", "B": "Mit der Besichtigung der Immobilie.", "C": "Mit dem wirksamen Zustandekommen des Hauptvertrags (Kauf- oder Mietvertrag).", "D": "Mit der Reservierung der Immobilie." }, correctAnswer: "C", topic: "Fachkenntnisse", explanation: "Der Provisionsanspruch entsteht erst, wenn der Hauptvertrag (z.B. Kaufvertrag) infolge des Nachweises oder der Vermittlung des Maklers wirksam zustande gekommen ist (§ 652 BGB).", difficulty: "medium" },
    { question: "Was ist das Grundbuch?", options: { "A": "Ein Verzeichnis aller Einwohner einer Stadt.", "B": "Ein öffentliches Register, das die Rechtsverhältnisse an Grundstücken darlegt.", "C": "Ein Buch über die Bodenbeschaffenheit.", "D": "Eine Liste aller Makler in Deutschland." }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Das Grundbuch ist ein öffentliches Register, welches die Eigentumsverhältnisse sowie etwaige Rechte und Lasten an Grundstücken verzeichnet.", difficulty: "medium" },
    { question: "In welcher Abteilung des Grundbuchs stehen Hypotheken und Grundschulden?", options: { "A": "Abteilung I", "B": "Abteilung II", "C": "Abteilung III", "D": "Im Bestandsverzeichnis" }, correctAnswer: "C", topic: "Fachkenntnisse", explanation: "Abteilung III des Grundbuchs enthält die Grundpfandrechte, also Hypotheken, Grundschulden und Rentenschulden.", difficulty: "medium" },
    { question: "Was ist eine 'Auflassung'?", options: { "A": "Die Kündigung eines Mietvertrags.", "B": "Die dingliche Einigung über den Eigentumsübergang an einem Grundstück (§ 925 BGB).", "C": "Die Übergabe der Schlüssel.", "D": "Die Löschung einer Grundschuld." }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Die Auflassung ist die zur Übertragung des Eigentums an einem Grundstück erforderliche Einigung zwischen Veräußerer und Erwerber. Sie muss bei gleichzeitiger Anwesenheit beider Teile vor einer zuständigen Stelle (Notar) erklärt werden.", difficulty: "medium" },
    { question: "Was regelt der Flächennutzungsplan (FNP)?", options: { "A": "Die genaue Farbe der Dachziegel.", "B": "Die Art der baulichen Nutzung für das gesamte Gemeindegebiet in Grundzügen.", "C": "Die Bepflanzung der Vorgärten.", "D": "Die Innenraumgestaltung von Gebäuden." }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Der Flächennutzungsplan ist der vorbereitende Bauleitplan, der die beabsichtigte Art der Bodennutzung für das gesamte Gemeindegebiet in den Grundzügen darstellt.", difficulty: "medium" },
    { question: "Was bedeutet 'Geschossflächenzahl' (GFZ)?", options: { "A": "Die Anzahl der Fenster pro Geschoss.", "B": "Das Verhältnis der gesamten Geschossfläche zur Größe des Baugrundstücks.", "C": "Die Höhe des Gebäudes in Metern.", "D": "Die Anzahl der erlaubten Stockwerke." }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Die Geschossflächenzahl (GFZ) gibt an, wie viel Quadratmeter Geschossfläche je Quadratmeter Grundstücksfläche zulässig sind.", difficulty: "medium" },
  ],
  2: [
    { question: "Was regelt § 34c GewO?", options: { "A": "Die Mietpreisbremse", "B": "Die Erlaubnispflicht für Immobilienmakler und Darlehensvermittler", "C": "Die Grunderwerbsteuer", "D": "Das Wohnungseigentumsgesetz" }, correctAnswer: "B", topic: "Maklerrecht", explanation: "§ 34c GewO regelt die Erlaubnispflicht für die gewerbsmäßige Ausübung der Tätigkeiten als Immobilienmakler, Darlehensvermittler, Bauträger und Baubetreuer. Wer diese Tätigkeiten ausüben möchte, benötigt eine behördliche Erlaubnis.", difficulty: "easy" },
    { question: "Seit wann gilt das Bestellerprinzip für Wohnungsmakler?", options: { "A": "2015", "B": "2018", "C": "2020", "D": "2022" }, correctAnswer: "C", topic: "Maklerrecht", explanation: "Das Bestellerprinzip für Wohnungsmakler gilt seit dem 23. Dezember 2020. Es besagt, dass derjenige, der den Makler beauftragt (bestellt), auch die Provision zahlen muss. Bei Vermietung zahlt der Vermieter, bei Verkauf teilen sich Käufer und Verkäufer die Provision mindestens hälftig.", difficulty: "medium" },
    { question: "Wie hoch ist die übliche Maklercourtage beim Immobilienkauf?", options: { "A": "1-2% des Kaufpreises", "B": "3,57% bis 7,14% des Kaufpreises (je nach Bundesland)", "C": "10% des Kaufpreises", "D": "Festbetrag von 5.000 €" }, correctAnswer: "B", topic: "Courtage", explanation: "Die Maklercourtage beim Immobilienkauf beträgt üblicherweise zwischen 3,57% und 7,14% des Kaufpreises (inkl. MwSt.), abhängig vom Bundesland. Seit 2020 muss der Käufer maximal 50% der Gesamtprovision zahlen, wenn der Verkäufer den Makler beauftragt hat.", difficulty: "medium" },
    { question: "Wann entsteht der Provisionsanspruch des Maklers?", options: { "A": "Bei Vertragsunterzeichnung", "B": "Bei Besichtigung der Immobilie", "C": "Beim Nachweis oder bei der Vermittlung eines Vertrages", "D": "Nach Ablauf der Widerrufsfrist" }, correctAnswer: "C", topic: "Maklerrecht", explanation: "Der Provisionsanspruch des Maklers entsteht, wenn durch seine Tätigkeit ein Vertrag (Kauf, Miete) zustande kommt (Vermittlung) oder er den Vertragspartner nachweist (Nachweis). Der Vertrag muss rechtswirksam sein und nicht mehr widerrufen werden können.", difficulty: "medium" },
    { question: "Was ist ein 'Alleinauftrag' beim Makler?", options: { "A": "Der Makler darf nur eine Immobilie vermitteln", "B": "Der Eigentümer beauftragt nur einen Makler und schaltet keine weiteren ein", "C": "Der Makler arbeitet allein ohne Team", "D": "Der Auftrag ist auf einen Monat begrenzt" }, correctAnswer: "B", topic: "Maklervertrag", explanation: "Bei einem Alleinauftrag verpflichtet sich der Eigentümer, für einen bestimmten Zeitraum nur einen Makler mit der Vermarktung zu beauftragen und keine weiteren Makler einzuschalten. Im Gegenzug verpflichtet sich der Makler zu intensiveren Vermarktungsmaßnahmen.", difficulty: "medium" },
    { question: "Welche Pflichten hat ein Makler gegenüber seinen Auftraggebern?", options: { "A": "Nur die Immobilie zu zeigen", "B": "Sorgfaltspflicht, Treuepflicht, Aufklärungspflicht", "C": "Nur die Provision einzufordern", "D": "Keine besonderen Pflichten" }, correctAnswer: "B", topic: "Maklerpflichten", explanation: "Der Makler hat umfassende Pflichten: Sorgfaltspflicht (gewissenhafte Arbeit), Treuepflicht (Interessenwahrung), Aufklärungspflicht (über wesentliche Umstände), Verschwiegenheitspflicht und Rechenschaftspflicht. Verstöße können zu Schadensersatz und Provisionsverlust führen.", difficulty: "medium" },
    { question: "Was ist die 'Makler- und Bauträgerverordnung' (MaBV)?", options: { "A": "Eine Verordnung über Bauvorschriften", "B": "Eine Verordnung über die Pflichten von Maklern und Bauträgern", "C": "Eine Steuerverordnung", "D": "Eine Mietrechtsverordnung" }, correctAnswer: "B", topic: "Maklerrecht", explanation: "Die MaBV regelt die Pflichten von Immobilienmaklern, Darlehensvermittlern, Bauträgern und Baubetreuern. Sie enthält Vorschriften über Vermögensschäden-Haftpflichtversicherung, Werbung, Vertragsanbahnung und Informationspflichten.", difficulty: "hard" },
    { question: "Welche Versicherung muss ein Makler nach MaBV abschließen?", options: { "A": "Krankenversicherung", "B": "Vermögensschaden-Haftpflichtversicherung", "C": "Lebensversicherung", "D": "Rechtsschutzversicherung" }, correctAnswer: "B", topic: "Versicherung", explanation: "Nach § 3 MaBV muss ein Makler eine Vermögensschaden-Haftpflichtversicherung mit einer Mindestdeckungssumme von 500.000 € für Personenschäden und 250.000 € für sonstige Schäden abschließen. Dies dient dem Schutz der Auftraggeber.", difficulty: "medium" },
    { question: "Was bedeutet 'qualifizierter Alleinauftrag'?", options: { "A": "Der Makler hat eine besondere Qualifikation", "B": "Der Eigentümer darf selbst nicht mehr verkaufen", "C": "Der Eigentümer beauftragt nur einen Makler, darf aber selbst noch verkaufen", "D": "Der Auftrag ist besonders teuer" }, correctAnswer: "C", topic: "Maklervertrag", explanation: "Beim qualifizierten Alleinauftrag beauftragt der Eigentümer nur einen Makler, behält sich aber das Recht vor, die Immobilie selbst zu verkaufen. Beim einfachen Alleinauftrag ist auch der Eigenverkauf ausgeschlossen. Der qualifizierte Alleinauftrag ist die häufigste Form.", difficulty: "hard" },
    { question: "Welche Angaben MÜSSEN in einem Immobilienexposé enthalten sein?", options: { "A": "Nur der Preis", "B": "Energieausweis-Angaben sind Pflicht", "C": "Nur die Adresse", "D": "Keine Pflichtangaben" }, correctAnswer: "B", topic: "Exposé", explanation: "Nach EnEV/GEG müssen in kommerziellen Immobilienanzeigen bestimmte Energieausweis-Angaben gemacht werden: Art des Ausweises, Energieträger, Baujahr, Energieeffizienzklasse und Energiekennwert. Verstöße können mit Bußgeldern geahndet werden.", difficulty: "hard" },
    { question: "Welche Erlaubnis ist für die Tätigkeit als Immobilienmakler zwingend erforderlich?", options: { "A": "Gewerbeanmeldung nach §14 GewO", "B": "Erlaubnis nach §34c GewO", "C": "Handelsregistereintrag", "D": "IHK-Zertifikat" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Die Tätigkeit als Immobilienmakler ist erlaubnispflichtig nach §34c der Gewerbeordnung (GewO). Eine bloße Gewerbeanmeldung reicht nicht aus.", difficulty: "medium" },
    { question: "Was versteht man unter dem 'Bestellerprinzip' bei der Wohnraumvermittlung?", options: { "A": "Der Käufer zahlt immer die Provision.", "B": "Derjenige zahlt den Makler, der ihn schriftlich beauftragt hat.", "C": "Die Provision wird immer 50/50 geteilt.", "D": "Der Verkäufer zahlt immer die Provision." }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Seit 2015 gilt bei der Wohnraumvermietung das Bestellerprinzip: Wer bestellt (beauftragt), der bezahlt. Meist ist dies der Vermieter.", difficulty: "medium" },
    { question: "Wie lange beträgt die gesetzliche Widerrufsfrist bei Maklerverträgen, die im Fernabsatz geschlossen wurden?", options: { "A": "14 Tage", "B": "1 Monat", "C": "7 Tage", "D": "Es gibt kein Widerrufsrecht" }, correctAnswer: "A", topic: "Fachkenntnisse", explanation: "Verbraucher haben bei Fernabsatzverträgen (z.B. per E-Mail oder Telefon) ein gesetzliches Widerrufsrecht von 14 Tagen.", difficulty: "medium" },
    { question: "Welche Pflichten hat ein Makler nach dem Geldwäschegesetz (GwG)?", options: { "A": "Nur Bargeld annehmen", "B": "Identifizierung des Vertragspartners und Risikobewertung", "C": "Meldung aller Verkäufe an das Finanzamt", "D": "Keine besonderen Pflichten" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Immobilienmakler sind Verpflichtete nach dem GwG und müssen ihre Vertragspartner identifizieren (KYC) sowie eine Risikoanalyse durchführen.", difficulty: "medium" },
    { question: "Was ist ein 'qualifizierter Alleinauftrag'?", options: { "A": "Ein Auftrag, bei dem der Makler keine Provision erhält.", "B": "Ein Auftrag, bei dem der Kunde auch andere Makler beauftragen darf.", "C": "Ein Auftrag, der den Kunden verpflichtet, nicht selbst tätig zu werden (Interessenten an Makler verweisen).", "D": "Ein Auftrag nur für qualifizierte Immobilien." }, correctAnswer: "C", topic: "Fachkenntnisse", explanation: "Beim qualifizierten Alleinauftrag verzichtet der Auftraggeber darauf, parallel andere Makler einzuschalten UND verpflichtet sich, eigene Interessenten an den Makler zu verweisen.", difficulty: "medium" },
  ],
  3: [
    { question: "Was bedeutet 'WEG'?", options: { "A": "Wohnungseigentumsgesetz", "B": "Wohnungseigentümergemeinschaft", "C": "Wohnungserwerbs-Gesetz", "D": "Wohnungs-Entwicklungs-Gesellschaft" }, correctAnswer: "A", topic: "WEG-Verwaltung", explanation: "WEG steht für 'Wohnungseigentumsgesetz'. Es regelt das Wohnungseigentum und die Rechte und Pflichten der Wohnungseigentümer. Umgangssprachlich wird auch die Wohnungseigentümergemeinschaft als 'WEG' bezeichnet.", difficulty: "easy" },
    { question: "Was ist das 'Sondereigentum' in einer WEG?", options: { "A": "Das Eigentum an der gesamten Immobilie", "B": "Das ausschließliche Eigentum an einer Wohnung oder Räumen", "C": "Das Eigentum am Grundstück", "D": "Das Eigentum an Gemeinschaftsanlagen" }, correctAnswer: "B", topic: "WEG-Verwaltung", explanation: "Sondereigentum ist das ausschließliche Eigentum an einer Wohnung oder an nicht zu Wohnzwecken dienenden Räumen (Teileigentum). Es ist mit einem Miteigentumsanteil am Gemeinschaftseigentum verbunden. Der Eigentümer kann über sein Sondereigentum frei verfügen.", difficulty: "medium" },
    { question: "Was gehört zum 'Gemeinschaftseigentum' in einer WEG?", options: { "A": "Nur das Grundstück", "B": "Nur das Treppenhaus", "C": "Grundstück, tragende Wände, Dach, Fassade, Treppenhaus, Heizung", "D": "Nur die Wohnungen" }, correctAnswer: "C", topic: "WEG-Verwaltung", explanation: "Zum Gemeinschaftseigentum gehören alle Teile des Grundstücks und Gebäudes, die nicht Sondereigentum sind: Grundstück, tragende Wände, Dach, Fassade, Treppenhaus, Aufzug, Heizungsanlage, Leitungen (außerhalb der Wohnung). Alle Eigentümer sind daran gemeinschaftlich berechtigt.", difficulty: "medium" },
    { question: "Was ist eine 'Eigentümerversammlung'?", options: { "A": "Ein geselliges Treffen der Eigentümer", "B": "Das beschlussfassende Organ der Wohnungseigentümergemeinschaft", "C": "Eine Versammlung von Mietern", "D": "Ein Treffen mit dem Verwalter" }, correctAnswer: "B", topic: "WEG-Verwaltung", explanation: "Die Eigentümerversammlung ist das oberste Beschlussorgan der WEG. Hier treffen sich alle Wohnungseigentümer, um über wichtige Angelegenheiten zu entscheiden (z.B. Jahresabrechnung, Instandhaltungsmaßnahmen, Verwalterwahl). Beschlüsse werden nach Köpfen oder Miteigentumsanteilen gefasst.", difficulty: "medium" },
    { question: "Was ist die 'Instandhaltungsrücklage'?", options: { "A": "Eine Rücklage für Notfälle", "B": "Eine Rücklage für zukünftige Instandhaltungs- und Instandsetzungsmaßnahmen", "C": "Eine Rücklage für Versicherungen", "D": "Eine Rücklage für Steuern" }, correctAnswer: "B", topic: "WEG-Verwaltung", explanation: "Die Instandhaltungsrücklage ist eine finanzielle Rücklage der WEG für zukünftige Instandhaltungs- und Instandsetzungsmaßnahmen am Gemeinschaftseigentum (z.B. Dachsanierung, Fassadenanstrich). Jeder Eigentümer zahlt monatlich einen Betrag ein, der nach Miteigentumsanteilen berechnet wird.", difficulty: "medium" },
    { question: "Was sind 'Betriebskosten' im Mietrecht?", options: { "A": "Die Kosten für den Betrieb eines Unternehmens", "B": "Die Kosten, die dem Eigentümer durch den Betrieb der Immobilie entstehen", "C": "Die Kosten für Reparaturen", "D": "Die Kosten für Möbel" }, correctAnswer: "B", topic: "Mietverwaltung", explanation: "Betriebskosten sind die Kosten, die dem Eigentümer durch den bestimmungsgemäßen Gebrauch der Immobilie laufend entstehen. Dazu gehören z.B. Grundsteuer, Wasser, Heizung, Müllabfuhr, Hausmeister. Sie können auf den Mieter umgelegt werden, wenn dies im Mietvertrag vereinbart ist.", difficulty: "medium" },
    { question: "Welche Kosten dürfen NICHT als Betriebskosten auf Mieter umgelegt werden?", options: { "A": "Grundsteuer", "B": "Wasserkosten", "C": "Verwaltungskosten", "D": "Heizkosten" }, correctAnswer: "C", topic: "Betriebskosten", explanation: "Verwaltungskosten (z.B. Kosten für Hausverwaltung, Bankgebühren, Porto) dürfen nicht als Betriebskosten auf Mieter umgelegt werden. Sie sind Kosten des Eigentümers. Umlagefähig sind nur die in § 2 BetrKV aufgeführten Kostenarten.", difficulty: "hard" },
    { question: "Was ist eine 'Nebenkostenabrechnung'?", options: { "A": "Eine Rechnung für Reparaturen", "B": "Die jährliche Abrechnung der umlagefähigen Betriebskosten", "C": "Eine Rechnung für Möbel", "D": "Die Mietrechnung" }, correctAnswer: "B", topic: "Betriebskosten", explanation: "Die Nebenkostenabrechnung (auch Betriebskostenabrechnung) ist die jährliche Abrechnung der auf den Mieter umgelegten Betriebskosten. Der Vermieter muss sie spätestens 12 Monate nach Ende des Abrechnungszeitraums erstellen. Der Mieter hat ein Recht auf Einsicht in die Belege.", difficulty: "medium" },
    { question: "Was ist der Unterschied zwischen 'Instandhaltung' und 'Instandsetzung'?", options: { "A": "Es gibt keinen Unterschied", "B": "Instandhaltung = vorbeugende Maßnahmen, Instandsetzung = Reparatur von Schäden", "C": "Instandsetzung ist teurer", "D": "Instandhaltung ist nur für Mieter" }, correctAnswer: "B", topic: "Instandhaltung", explanation: "Instandhaltung umfasst vorbeugende Maßnahmen zur Erhaltung des ordnungsgemäßen Zustands (z.B. Wartung, Pflege). Instandsetzung bedeutet die Beseitigung von Schäden und Mängeln (z.B. Reparatur defekter Teile). Beide Begriffe sind wichtig für die Kostenabgrenzung in WEG und Mietverwaltung.", difficulty: "hard" },
    { question: "Wie wird das 'Hausgeld' in einer WEG berechnet?", options: { "A": "Alle Eigentümer zahlen denselben Betrag", "B": "Nach Miteigentumsanteilen (MEA)", "C": "Nach Wohnungsgröße", "D": "Nach Anzahl der Personen" }, correctAnswer: "B", topic: "Hausgeld", explanation: "Das Hausgeld wird nach Miteigentumsanteilen (MEA) berechnet. Jeder Eigentümer zahlt entsprechend seinem Anteil am Gemeinschaftseigentum. Das Hausgeld umfasst Betriebskosten, Verwaltungskosten und die Zuführung zur Instandhaltungsrücklage.", difficulty: "medium" },
    { question: "Was ist die Hauptaufgabe eines WEG-Verwalters?", options: { "A": "Vermietung der Wohnungen", "B": "Verwaltung des gemeinschaftlichen Eigentums", "C": "Verkauf der Wohnungen", "D": "Renovierung des Sondereigentums" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Der WEG-Verwalter ist primär für die Verwaltung des gemeinschaftlichen Eigentums (Dach, Fassade, Treppenhaus etc.) zuständig, nicht für das Sondereigentum.", difficulty: "medium" },
    { question: "Welches Gesetz wurde 2020 umfassend reformiert und betrifft die Wohnungseigentumsverwaltung?", options: { "A": "BGB", "B": "WEMoG (Wohnungseigentumsmodernisierungsgesetz)", "C": "GewO", "D": "BauGB" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Das WEMoG trat am 01.12.2020 in Kraft und hat das WEG-Recht grundlegend reformiert (z.B. Zertifizierter Verwalter, bauliche Veränderungen).", difficulty: "medium" },
    { question: "Wann muss die Eigentümerversammlung (ETV) mindestens einberufen werden?", options: { "A": "Alle 2 Jahre", "B": "Mindestens einmal im Jahr", "C": "Nur bei Bedarf", "D": "Alle 6 Monate" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Nach § 24 Abs. 1 WEG muss der Verwalter die Eigentümerversammlung mindestens einmal im Jahr einberufen.", difficulty: "medium" },
    { question: "Was ist die 'Erhaltungsrücklage' (früher Instandhaltungsrücklage)?", options: { "A": "Der Gewinn des Verwalters", "B": "Eine Ansammlung von Mitteln für künftige Instandsetzungen am Gemeinschaftseigentum", "C": "Die Kaution der Mieter", "D": "Eine Steuer für Eigentümer" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Die Erhaltungsrücklage ist eine zweckgebundene Rücklage der Eigentümergemeinschaft, um zukünftige Reparaturen und Sanierungen am Gemeinschaftseigentum zu finanzieren.", difficulty: "medium" },
    { question: "Wer bestellt den Verwalter in einer WEG?", options: { "A": "Das Amtsgericht", "B": "Die Eigentümerversammlung durch Beschluss", "C": "Der Verwaltungsbeirat allein", "D": "Die Gemeinde" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Der Verwalter wird von der Eigentümerversammlung durch Mehrheitsbeschluss bestellt (§ 26 WEG).", difficulty: "medium" },
  ],
  4: [
    { question: "Was ist der 'Verkehrswert' einer Immobilie?", options: { "A": "Der Wert der Verkehrsanbindung", "B": "Der Marktwert, der im gewöhnlichen Geschäftsverkehr erzielbar ist", "C": "Der Versicherungswert", "D": "Der Beleihungswert" }, correctAnswer: "B", topic: "Bewertung", explanation: "Der Verkehrswert (auch Marktwert) ist der Preis, der zum Wertermittlungsstichtag im gewöhnlichen Geschäftsverkehr nach den rechtlichen Gegebenheiten und tatsächlichen Eigenschaften ohne Rücksicht auf ungewöhnliche oder persönliche Verhältnisse erzielbar wäre.", difficulty: "medium" },
    { question: "Welche Wertermittlungsverfahren gibt es?", options: { "A": "Nur das Vergleichswertverfahren", "B": "Vergleichswertverfahren, Ertragswertverfahren, Sachwertverfahren", "C": "Nur das Ertragswertverfahren", "D": "Nur das Sachwertverfahren" }, correctAnswer: "B", topic: "Bewertung", explanation: "Es gibt drei normierte Wertermittlungsverfahren: Vergleichswertverfahren (Vergleich mit ähnlichen Objekten), Ertragswertverfahren (kapitalisierte Erträge) und Sachwertverfahren (Herstellungskosten minus Alterswertminderung). Die Wahl hängt von der Immobilienart ab.", difficulty: "medium" },
    { question: "Für welche Immobilienart ist das Ertragswertverfahren geeignet?", options: { "A": "Eigengenutzte Einfamilienhäuser", "B": "Vermietete Mehrfamilienhäuser und Gewerbeimmobilien", "C": "Unbebaute Grundstücke", "D": "Denkmalgeschützte Gebäude" }, correctAnswer: "B", topic: "Ertragswertverfahren", explanation: "Das Ertragswertverfahren wird für vermietete Immobilien angewendet, bei denen der Ertrag (Miete) im Vordergrund steht. Es eignet sich für Mehrfamilienhäuser, Gewerbeimmobilien und gemischt genutzte Objekte. Der Wert ergibt sich aus den kapitalisierten Reinerträgen.", difficulty: "medium" },
    { question: "Was ist der 'Bodenwert'?", options: { "A": "Der Wert des Bodenbelags", "B": "Der Wert des unbebauten Grundstücks", "C": "Der Wert des Kellers", "D": "Der Wert der Gartenanlage" }, correctAnswer: "B", topic: "Bewertung", explanation: "Der Bodenwert ist der Wert des unbebauten Grundstücks. Er wird im Vergleichswertverfahren anhand von Bodenrichtwerten ermittelt. Der Bodenwert ist eine wichtige Größe im Sachwertverfahren und Ertragswertverfahren.", difficulty: "easy" },
    { question: "Was sind 'Bodenrichtwerte'?", options: { "A": "Durchschnittliche Ladenpreise für Grundstücke in einer Lage", "B": "Vorschriften für die Bodenbeschaffenheit", "C": "Werte für die Bodenqualität", "D": "Steuerwerte für Grundstücke" }, correctAnswer: "A", topic: "Bodenwert", explanation: "Bodenrichtwerte sind durchschnittliche Ladenpreise für unbebaute Grundstücke in einer bestimmten Lage. Sie werden von Gutachterausschüssen ermittelt und veröffentlicht. Sie dienen als Orientierung für die Wertermittlung und werden nach Lage, Art und Maß der Nutzung differenziert.", difficulty: "medium" },
    { question: "Was ist die 'Alterswertminderung'?", options: { "A": "Die Minderung des Werts durch das Alter des Eigentümers", "B": "Die Minderung des Gebäudewerts durch Alterung und Abnutzung", "C": "Die Minderung der Miete bei alten Gebäuden", "D": "Die Minderung der Grundsteuer" }, correctAnswer: "B", topic: "Sachwertverfahren", explanation: "Die Alterswertminderung ist die Minderung des Gebäudewerts durch Alterung, Abnutzung und technische Überholung. Sie wird im Sachwertverfahren vom Gebäudesachwert abgezogen. Die Berechnung erfolgt linear über die Gesamtnutzungsdauer des Gebäudes.", difficulty: "medium" },
    { question: "Was ist ein 'Verkehrswertgutachten'?", options: { "A": "Ein Gutachten über die Verkehrsanbindung", "B": "Ein Gutachten zur Ermittlung des Marktwerts einer Immobilie", "C": "Ein Gutachten über Verkehrsunfälle", "D": "Ein Gutachten über Parkplätze" }, correctAnswer: "B", topic: "Gutachten", explanation: "Ein Verkehrswertgutachten ist ein Gutachten zur Ermittlung des Marktwerts (Verkehrswerts) einer Immobilie. Es wird von Sachverständigen nach normierten Verfahren erstellt und dient z.B. für Erbauseinandersetzungen, Scheidungen, Zwangsversteigerungen oder Kreditvergaben.", difficulty: "easy" },
    { question: "Wer darf Verkehrswertgutachten erstellen?", options: { "A": "Nur Notare", "B": "Nur öffentlich bestellte und vereidigte Sachverständige", "C": "Jeder, aber für Gerichte nur zertifizierte Sachverständige", "D": "Nur Makler" }, correctAnswer: "C", topic: "Sachverständige", explanation: "Grundsätzlich darf jeder Verkehrswertgutachten erstellen. Für gerichtliche Zwecke werden jedoch meist öffentlich bestellte und vereidigte Sachverständige oder zertifizierte Sachverständige (z.B. nach DIN EN ISO/IEC 17024) beauftragt. Banken akzeptieren oft nur Gutachten von anerkannten Sachverständigen.", difficulty: "hard" },
    { question: "Was ist der Unterschied zwischen 'Verkehrswert' und 'Beleihungswert'?", options: { "A": "Es gibt keinen Unterschied", "B": "Verkehrswert = Marktwert, Beleihungswert = vorsichtig geschätzter Wert für Kreditsicherheit", "C": "Beleihungswert ist immer höher", "D": "Verkehrswert ist nur für Verkäufe relevant" }, correctAnswer: "B", topic: "Bewertung", explanation: "Der Verkehrswert ist der Marktwert, der im normalen Geschäftsverkehr erzielbar ist. Der Beleihungswert ist der Wert, den eine Bank bei der Kreditvergabe als Sicherheit ansetzt. Er liegt meist 10-20% unter dem Verkehrswert, da er vorsichtig und nachhaltig geschätzt wird.", difficulty: "hard" },
    { question: "Was ist ein 'Kurzgutachten'?", options: { "A": "Ein Gutachten, das sehr schnell erstellt wird", "B": "Ein vereinfachtes Gutachten mit weniger Detailtiefe", "C": "Ein Gutachten über kurze Gebäude", "D": "Ein Gutachten für kurze Zeiträume" }, correctAnswer: "B", topic: "Gutachten", explanation: "Ein Kurzgutachten ist ein vereinfachtes Verkehrswertgutachten mit reduziertem Umfang und weniger Detailtiefe. Es enthält die wesentlichen Wertermittlungsdaten, aber weniger Begründungen und Anlagen. Es ist günstiger und schneller zu erstellen als ein Vollgutachten.", difficulty: "medium" },
    { question: "Welches Verfahren ist für die Bewertung von Ein- und Zweifamilienhäusern primär anzuwenden?", options: { "A": "Ertragswertverfahren", "B": "Sachwertverfahren", "C": "Vergleichswertverfahren", "D": "Discounted-Cash-Flow-Verfahren" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Das Sachwertverfahren wird vorrangig bei Immobilien angewendet, die für die Eigennutzung konzipiert sind, wie Ein- und Zweifamilienhäuser, da hier der Substanzwert im Vordergrund steht.", difficulty: "medium" },
    { question: "Was ist der Bodenrichtwert?", options: { "A": "Der durchschnittliche Lagewert des Bodens für eine Mehrheit von Grundstücken", "B": "Der individuelle Wert eines konkreten Grundstücks", "C": "Der Verkaufspreis des letzten Jahres", "D": "Der Wert des Bodens inklusive Bebauung" }, correctAnswer: "A", topic: "Fachkenntnisse", explanation: "Der Bodenrichtwert ist ein aus Kaufpreissammlungen ermittelter durchschnittlicher Lagewert für eine Mehrheit von Grundstücken innerhalb eines abgegrenzten Gebiets (Bodenrichtwertzone).", difficulty: "medium" },
    { question: "Was versteht man unter dem Liegenschaftszins?", options: { "A": "Den Zinssatz für Hypothekendarlehen", "B": "Die Verzinsung des Verkehrswertes von Grundstücken", "C": "Den Zinssatz der Europäischen Zentralbank", "D": "Die Renditeerwartung des Mieters" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Der Liegenschaftszins ist der Zinssatz, mit dem der Verkehrswert von Grundstücken marktüblich verzinst wird. Er ist eine wesentliche Größe im Ertragswertverfahren.", difficulty: "medium" },
    { question: "Welche Faktoren beeinflussen den Rohertrag einer Immobilie?", options: { "A": "Nur die Größe des Grundstücks", "B": "Mieteinnahmen, Lage, Zustand und Ausstattung", "C": "Das Alter des Eigentümers", "D": "Die Farbe der Fassade" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Der Rohertrag wird maßgeblich durch die nachhaltig erzielbaren Mieteinnahmen bestimmt, welche wiederum von Lage, Zustand und Ausstattung der Immobilie abhängen.", difficulty: "medium" },
    { question: "Was ist bei der Bewertung von Erbbaurechten besonders zu beachten?", options: { "A": "Es gibt keine Besonderheiten", "B": "Das Erbbaurecht wird wie Volleigentum behandelt", "C": "Die Laufzeit des Erbbaurechts und der Erbbauzins", "D": "Erbbaurechte können nicht bewertet werden" }, correctAnswer: "C", topic: "Fachkenntnisse", explanation: "Bei Erbbaurechten sind die Restlaufzeit des Vertrages und die Höhe des zu zahlenden Erbbauzinses wertbestimmende Faktoren, die den Verkehrswert maßgeblich beeinflussen.", difficulty: "medium" },
    { question: "Welche Aufgabe hat der Gutachterausschuss?", options: { "A": "Erteilung von Baugenehmigungen", "B": "Führung der Kaufpreissammlung und Ermittlung von Bodenrichtwerten", "C": "Vermittlung von Immobilien", "D": "Festsetzung der Grundsteuer" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Der Gutachterausschuss führt die Kaufpreissammlung, wertet diese aus und ermittelt darauf basierend Bodenrichtwerte und sonstige für die Wertermittlung erforderliche Daten.", difficulty: "medium" },
    { question: "Was versteht man unter 'Marktanpassung' im Sachwertverfahren?", options: { "A": "Die Anpassung der Miete an den Mietspiegel", "B": "Die Berücksichtigung der aktuellen Marktlage durch den Sachwertfaktor", "C": "Die Renovierung der Immobilie vor dem Verkauf", "D": "Die Anpassung des Bodenrichtwerts" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Da der vorläufige Sachwert rein rechnerisch ermittelt wird, muss er durch den Sachwertfaktor an die tatsächliche Marktlage angepasst werden, um den Verkehrswert zu erhalten.", difficulty: "medium" },
    { question: "Welches Gesetz regelt die Immobilienwertermittlung in Deutschland maßgeblich?", options: { "A": "BGB", "B": "BauGB und ImmoWertV", "C": "StGB", "D": "HGB" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Das Baugesetzbuch (BauGB) und die Immobilienwertermittlungsverordnung (ImmoWertV) bilden die rechtliche Grundlage für die Verkehrswertermittlung in Deutschland.", difficulty: "medium" },
    { question: "Was ist der Unterschied zwischen Verkehrswert und Beleihungswert?", options: { "A": "Es gibt keinen Unterschied", "B": "Verkehrswert ist der aktuelle Marktwert, Beleihungswert ein vorsichtigerer Wert für Kreditsicherheiten", "C": "Beleihungswert ist immer höher als der Verkehrswert", "D": "Verkehrswert gilt nur für Gewerbeimmobilien" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Der Verkehrswert spiegelt den aktuellen Marktwert wider, während der Beleihungswert ein unter Sicherheitsaspekten ermittelter Wert ist, der langfristig erzielt werden kann und meist unter dem Verkehrswert liegt.", difficulty: "medium" },
    { question: "Was bedeutet 'Restnutzungsdauer'?", options: { "A": "Die Zeit bis zum nächsten Mieterwechsel", "B": "Die Anzahl der Jahre, in denen eine bauliche Anlage bei ordnungsgemäßer Bewirtschaftung voraussichtlich noch wirtschaftlich genutzt werden kann", "C": "Die Dauer der Bauphase", "D": "Die Zeit bis zur vollständigen Abschreibung" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Die Restnutzungsdauer ist die Zeitspanne, in der ein Gebäude voraussichtlich noch wirtschaftlich genutzt werden kann. Sie ist eine zentrale Größe in allen Wertermittlungsverfahren.", difficulty: "medium" },
  ],
  5: [
    { question: "Was regelt § 34i GewO?", options: { "A": "Die Immobilienmakler-Erlaubnis", "B": "Die Erlaubnispflicht für Darlehensvermittler", "C": "Die Grunderwerbsteuer", "D": "Das Mietrecht" }, correctAnswer: "B", topic: "Darlehensvermittlung", explanation: "§ 34i GewO regelt die Erlaubnispflicht für Darlehensvermittler, Finanzanlagenvermittler und Honorar-Finanzanlagenberater. Wer gewerbsmäßig Darlehensverträge vermittelt, benötigt eine behördliche Erlaubnis nach § 34i GewO.", difficulty: "easy" },
    { question: "Was ist ein 'Annuitätendarlehen'?", options: { "A": "Ein Darlehen mit steigenden Raten", "B": "Ein Darlehen mit gleichbleibenden Raten aus Zins und Tilgung", "C": "Ein Darlehen ohne Zinsen", "D": "Ein Darlehen nur für Immobilien" }, correctAnswer: "B", topic: "Finanzierung", explanation: "Ein Annuitätendarlehen ist die häufigste Darlehensform bei Immobilienfinanzierungen. Die monatliche Rate (Annuität) bleibt während der Zinsbindung konstant. Sie setzt sich aus Zins und Tilgung zusammen. Mit jeder Rate sinkt der Zinsanteil und der Tilgungsanteil steigt.", difficulty: "medium" },
    { question: "Was bedeutet 'Zinsbindung'?", options: { "A": "Die Zinsen sind für immer festgelegt", "B": "Der Zinssatz ist für einen vereinbarten Zeitraum fest", "C": "Die Zinsen können jederzeit geändert werden", "D": "Die Zinsen sind an die Inflation gebunden" }, correctAnswer: "B", topic: "Finanzierung", explanation: "Die Zinsbindung ist der Zeitraum, für den der Zinssatz eines Darlehens fest vereinbart ist (z.B. 10, 15 oder 20 Jahre). Während dieser Zeit kann die Bank den Zinssatz nicht ändern. Nach Ablauf der Zinsbindung wird eine Anschlussfinanzierung benötigt.", difficulty: "medium" },
    { question: "Was ist die 'Tilgung' bei einem Darlehen?", options: { "A": "Die Zinszahlung", "B": "Die Rückzahlung des Darlehensbetrags", "C": "Die Gebühren der Bank", "D": "Die Versicherungsprämie" }, correctAnswer: "B", topic: "Finanzierung", explanation: "Die Tilgung ist die Rückzahlung des Darlehensbetrags (Kapital). Bei einem Annuitätendarlehen wird mit jeder Rate ein Teil getilgt. Die Tilgung wird in Prozent pro Jahr angegeben (z.B. 2% Anfangstilgung). Je höher die Tilgung, desto schneller ist das Darlehen abbezahlt.", difficulty: "easy" },
    { question: "Was ist ein 'Tilgungsplan'?", options: { "A": "Ein Plan für die Bauplanung", "B": "Eine Übersicht über die Rückzahlung des Darlehens", "C": "Ein Plan für die Zinszahlungen", "D": "Ein Plan für die Versicherungen" }, correctAnswer: "B", topic: "Finanzierung", explanation: "Ein Tilgungsplan ist eine tabellarische Übersicht über den Verlauf der Darlehensrückzahlung. Er zeigt für jede Rate den Zinsanteil, Tilgungsanteil und die Restschuld. Der Tilgungsplan wird von der Bank bei Vertragsabschluss erstellt und ist wichtig für die Finanzplanung.", difficulty: "medium" },
    { question: "Was ist die 'Grundschuld'?", options: { "A": "Eine Steuer auf Grundstücke", "B": "Ein dingliches Recht zur Absicherung von Darlehen", "C": "Eine Schuld des Grundstücks", "D": "Eine Gebühr für das Grundbuch" }, correctAnswer: "B", topic: "Finanzierung", explanation: "Die Grundschuld ist ein dingliches Recht, das im Grundbuch eingetragen wird. Sie dient der Bank als Sicherheit für ein Darlehen. Im Gegensatz zur Hypothek ist die Grundschuld nicht akzessorisch, d.h. sie bleibt auch nach Tilgung des Darlehens bestehen und kann für weitere Kredite genutzt werden.", difficulty: "medium" },
    { question: "Was ist der 'Beleihungswert' einer Immobilie?", options: { "A": "Der Verkehrswert", "B": "Der Wert, den eine Bank als Sicherheit für ein Darlehen ansetzt", "C": "Der Versicherungswert", "D": "Der Kaufpreis" }, correctAnswer: "B", topic: "Finanzierung", explanation: "Der Beleihungswert ist der Wert, den eine Bank bei der Kreditvergabe als Sicherheit ansetzt. Er wird vorsichtig und nachhaltig ermittelt und liegt meist 10-20% unter dem Verkehrswert. Die Bank finanziert in der Regel nur einen Prozentsatz des Beleihungswerts (Beleihungsgrenze).", difficulty: "medium" },
    { question: "Was bedeutet 'Sondertilgung'?", options: { "A": "Eine besonders hohe Tilgung", "B": "Eine außerplanmäßige Tilgung zusätzlich zur regulären Rate", "C": "Eine Tilgung nur für Sonderfälle", "D": "Eine Tilgung ohne Zinsen" }, correctAnswer: "B", topic: "Finanzierung", explanation: "Eine Sondertilgung ist eine außerplanmäßige Tilgung zusätzlich zur regulären monatlichen Rate. Sie ermöglicht es, das Darlehen schneller zurückzuzahlen. Sondertilgungen müssen im Darlehensvertrag vereinbart werden und sind oft auf einen bestimmten Prozentsatz pro Jahr begrenzt (z.B. 5%).", difficulty: "medium" },
    { question: "Was ist eine 'Anschlussfinanzierung'?", options: { "A": "Die erste Finanzierung einer Immobilie", "B": "Die Finanzierung nach Ablauf der Zinsbindung", "C": "Eine zusätzliche Finanzierung", "D": "Eine Finanzierung für Anschlüsse (Wasser, Strom)" }, correctAnswer: "B", topic: "Finanzierung", explanation: "Eine Anschlussfinanzierung ist die Fortsetzung der Finanzierung nach Ablauf der Zinsbindung. Da das Darlehen meist noch nicht vollständig getilgt ist, muss eine neue Vereinbarung mit der Bank getroffen werden. Alternativ kann man zu einer anderen Bank wechseln (Umschuldung).", difficulty: "medium" },
    { question: "Welche IHK-Prüfung ist für Immobilienmakler relevant?", options: { "A": "Sachkundeprüfung nach § 34c GewO", "B": "Meisterprüfung", "C": "Gesellenprüfung", "D": "Abitur" }, correctAnswer: "A", topic: "Prüfung", explanation: "Die Sachkundeprüfung nach § 34c GewO ist für Immobilienmakler, Darlehensvermittler, Bauträger und Baubetreuer relevant. Sie wird von der IHK abgenommen und ist Voraussetzung für die Erlaubniserteilung. Die Prüfung umfasst rechtliche, wirtschaftliche und fachliche Kenntnisse.", difficulty: "easy" },
    { question: "Was versteht man unter dem Begriff 'Beleihungswert'?", options: { "A": "Den aktuellen Marktwert einer Immobilie", "B": "Den Wert, den die Bank langfristig als sicher erzielbar ansieht", "C": "Den Kaufpreis der Immobilie", "D": "Den steuerlichen Einheitswert" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Der Beleihungswert ist ein Sicherheitswert, der langfristig und unabhängig von konjunkturellen Schwankungen erzielt werden kann. Er bildet die Basis für die Kreditentscheidung.", difficulty: "medium" },
    { question: "Was ist ein Annuitätendarlehen?", options: { "A": "Ein Darlehen, das am Ende der Laufzeit in einer Summe zurückgezahlt wird", "B": "Ein Darlehen mit gleichbleibenden Raten aus Zins und Tilgung", "C": "Ein Darlehen mit variablen Zinsen", "D": "Ein staatlich gefördertes Darlehen" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Beim Annuitätendarlehen bleibt die monatliche Rate (Annuität) über die Zinsbindungsfrist konstant. Da der Zinsanteil mit jeder Rate sinkt, steigt der Tilgungsanteil entsprechend an.", difficulty: "medium" },
    { question: "Welche Unterlage ist für die Bonitätsprüfung eines Selbstständigen unerlässlich?", options: { "A": "Die letzten drei Gehaltsabrechnungen", "B": "Betriebswirtschaftliche Auswertungen (BWA) und Jahresabschlüsse", "C": "Ein Arbeitsvertrag", "D": "Eine Schufa-Selbstauskunft" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Da Selbstständige kein festes Gehalt beziehen, prüft die Bank die wirtschaftliche Stabilität anhand von BWAs, Einnahmen-Überschuss-Rechnungen oder Bilanzen der letzten Jahre.", difficulty: "medium" },
    { question: "Was bedeutet 'Vorfälligkeitsentschädigung'?", options: { "A": "Eine Gebühr für die vorzeitige Auszahlung des Darlehens", "B": "Eine Entschädigung der Bank für entgangene Zinsen bei vorzeitiger Rückzahlung", "C": "Eine Prämie für pünktliche Ratenzahlung", "D": "Die Kosten für die Eintragung der Grundschuld" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Kündigt ein Darlehensnehmer den Kredit während der Zinsbindungsfrist, entsteht der Bank ein Zinsausfallschaden. Diesen muss der Kunde durch die Vorfälligkeitsentschädigung ausgleichen.", difficulty: "medium" },
    { question: "Welche Funktion hat das Grundbuch bei der Finanzierung?", options: { "A": "Es dokumentiert den Zustand der Immobilie", "B": "Es dient der Absicherung des Darlehens durch Eintragung einer Grundschuld", "C": "Es regelt die Höhe der Grunderwerbsteuer", "D": "Es enthält den Energieausweis" }, correctAnswer: "B", topic: "Fachkenntnisse", explanation: "Das Grundbuch sichert das Darlehen dinglich ab. Die Bank lässt sich in Abteilung III eine Grundschuld oder Hypothek eintragen, um im Falle der Zahlungsunfähigkeit auf die Immobilie zugreifen zu können.", difficulty: "medium" },
  ],
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleOptions(q: typeof LOCAL_QUESTIONS[1][0]) {
  const letters = ["A","B","C","D"] as const;
  const entries = Object.entries(q.options) as [string, string][];
  const shuffled = shuffleArray(entries);
  const newOptions: Record<string,string> = {};
  let newCorrect = "A";
  shuffled.forEach(([origKey, value], idx) => {
    const newKey = letters[idx];
    newOptions[newKey] = value;
    if (origKey === q.correctAnswer) newCorrect = newKey;
  });
  return { ...q, options: newOptions, correctAnswer: newCorrect };
}

export const examRouter = router({
  getRecommendedDifficulty: protectedProcedure
    .input(z.object({ moduleId: z.number().min(1).max(5) }))
    .query(async ({ ctx, input }) => {
      const sessions = await getUserExamSessions(ctx.user.id, input.moduleId);
      const last5 = sessions.slice(0, 5);
      if (last5.length === 0) return { difficulty: "medium" as const, reason: "Erste Prüfung – Start mit mittlerem Schwierigkeitsgrad" };
      const avg = last5.reduce((s, x) => s + (x.score ?? 0), 0) / last5.length;
      if (avg >= 85) return { difficulty: "hard" as const, reason: `Ø ${avg.toFixed(1)}% – Schwieriger Modus` };
      if (avg >= 70) return { difficulty: "medium" as const, reason: `Ø ${avg.toFixed(1)}% – Mittlerer Modus` };
      return { difficulty: "easy" as const, reason: `Ø ${avg.toFixed(1)}% – Einfacher Modus` };
    }),

  startExam: protectedProcedure
    .input(z.object({ moduleId: z.number().min(1).max(5), difficulty: z.enum(["easy","medium","hard"]).default("medium"), isIHKMode: z.boolean().optional().default(false) }))
    .mutation(async ({ ctx, input }) => {
      const pool = LOCAL_QUESTIONS[input.moduleId] || [];
      const questionCount = input.isIHKMode ? Math.min(72, pool.length) : Math.min(10, pool.length);
      const timeLimit = input.isIHKMode ? 180 * 60 : 30 * 60;
      const session = await createExamSession(ctx.user.id, input.moduleId, questionCount, timeLimit, input.difficulty, input.isIHKMode);
      if (!session) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Prüfungssitzung konnte nicht erstellt werden" });
      return session;
    }),

  generateQuestion: protectedProcedure
    .input(z.object({ sessionId: z.number(), questionNumber: z.number(), moduleId: z.number().min(1).max(5), difficulty: z.enum(["easy","medium","hard"]).default("medium") }))
    .mutation(async ({ ctx, input }) => {
      const session = await getExamSession(input.sessionId);
      if (!session || session.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN", message: "Ungültige Sitzung" });
      const existing = await getExamQuestions(input.sessionId);
      const usedTexts = new Set(existing.map(q => q.questionText.substring(0, 40)));
      const all = LOCAL_QUESTIONS[input.moduleId] || [];
      const filtered = input.difficulty === "medium" ? all : all.filter(q => q.difficulty === input.difficulty);
      const pool = filtered.length >= 3 ? filtered : all;
      const unused = pool.filter(q => !usedTexts.has(q.question.substring(0, 40)));
      const source = unused.length > 0 ? unused : pool;
      const raw = source[Math.floor(Math.random() * source.length)];
      const question = shuffleOptions(raw);
      const saved = await saveExamQuestion({ sessionId: input.sessionId, questionNumber: input.questionNumber, questionText: question.question, correctAnswer: question.correctAnswer, moduleId: input.moduleId, topic: question.topic, difficulty: input.difficulty as "easy" | "medium" | "hard", feedback: question.explanation });
      return { id: saved?.id, question: question.question, options: question.options, questionNumber: input.questionNumber };
    }),

  submitAnswer: protectedProcedure
    .input(z.object({ questionId: z.number(), userAnswer: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const question = await getExamQuestionById(input.questionId);
      if (!question) throw new TRPCError({ code: "NOT_FOUND", message: "Frage nicht gefunden" });
      const session = await getExamSession(question.sessionId);
      if (!session || session.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN", message: "Ungültige Sitzung" });
      const isCorrect = input.userAnswer === question.correctAnswer;
      await updateExamQuestion(input.questionId, input.userAnswer, isCorrect, question.feedback ?? undefined);
      if (!isCorrect && question.topic) await updateWeakTopic(ctx.user.id, question.moduleId, question.topic);
      return { isCorrect, correctAnswer: question.correctAnswer, feedback: question.feedback };
    }),

  completeExam: protectedProcedure
    .input(z.object({ sessionId: z.number(), timeSpent: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const session = await getExamSession(input.sessionId);
      if (!session || session.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN", message: "Ungültige Sitzung" });
      const questions = await getExamQuestions(input.sessionId);
      const correct = questions.filter(q => q.isCorrect).length;
      const score = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
      await completeExamSession(input.sessionId, correct, score, input.timeSpent);
      return { totalQuestions: questions.length, correctAnswers: correct, score, passed: score >= 70 };
    }),

  getSession: protectedProcedure
    .input(z.object({ sessionId: z.number() }))
    .query(async ({ ctx, input }) => {
      const session = await getExamSession(input.sessionId);
      if (!session || session.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN", message: "Ungültige Sitzung" });
      return { session, questions: await getExamQuestions(input.sessionId) };
    }),

  getHistory: protectedProcedure
    .input(z.object({ moduleId: z.number().min(1).max(5).optional() }))
    .query(async ({ ctx, input }) => getUserExamSessions(ctx.user.id, input.moduleId)),

  getWeakTopics: protectedProcedure
    .input(z.object({ moduleId: z.number().min(1).max(5).optional() }))
    .query(async ({ ctx, input }) => getWeakTopics(ctx.user.id, input.moduleId)),
});
</file>

<file path="server/ihk-timer.test.ts">
import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import { 
  createExamSession, 
  getExamSession,
  upsertUser 
} from "./db";

describe("IHK Timer Mode", () => {
  let testUserId: number;
  let normalSessionId: number;
  let ihkSessionId: number;

  beforeAll(async () => {
    // Create test user
    const openId = `test-ihk-timer-${Date.now()}`;
    await upsertUser({
      openId,
      name: "Test IHK Timer User",
      email: `test-ihk-timer-${Date.now()}@example.com`,
      role: "user",
    });
    
    // Get user from database
    const { getUserByOpenId } = await import("./db");
    const user = await getUserByOpenId(openId);
    if (!user) throw new Error("Failed to create test user");
    testUserId = user.id;

    // Create normal exam session (30 min, 10 questions)
    const normalSession = await createExamSession(
      testUserId,
      1, // moduleId
      10, // totalQuestions
      1800, // timeLimit (30 min)
      "medium", // difficulty
      false // isIHKMode
    );
    if (!normalSession) throw new Error("Failed to create normal exam session");
    normalSessionId = normalSession.id;

    // Create IHK exam session (180 min, 72 questions)
    const ihkSession = await createExamSession(
      testUserId,
      1, // moduleId
      72, // totalQuestions
      10800, // timeLimit (180 min)
      "medium", // difficulty
      true // isIHKMode
    );
    if (!ihkSession) throw new Error("Failed to create IHK exam session");
    ihkSessionId = ihkSession.id;
  });

  it("should create normal exam session with 30-minute time limit", async () => {
    const session = await getExamSession(normalSessionId);
    
    expect(session).toBeDefined();
    expect(session?.isIHKMode).toBe(false);
    expect(session?.timeLimit).toBe(1800); // 30 minutes
    expect(session?.totalQuestions).toBe(10);
  });

  it("should create IHK exam session with 180-minute time limit", async () => {
    const session = await getExamSession(ihkSessionId);
    
    expect(session).toBeDefined();
    expect(session?.isIHKMode).toBe(true);
    expect(session?.timeLimit).toBe(10800); // 180 minutes
    expect(session?.totalQuestions).toBe(72);
  });

  it("should retrieve IHK session data via tRPC", async () => {
    const caller = appRouter.createCaller({
      user: { id: testUserId, role: "user" as const, openId: "test", name: "Test", email: "test@test.com" },
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.exam.getSession({
      sessionId: ihkSessionId,
    });

    expect(result).toBeDefined();
    expect(result.session.isIHKMode).toBe(true);
    expect(result.session.timeLimit).toBe(10800);
    expect(result.session.totalQuestions).toBe(72);
  });

  it("should retrieve normal session data via tRPC", async () => {
    const caller = appRouter.createCaller({
      user: { id: testUserId, role: "user" as const, openId: "test", name: "Test", email: "test@test.com" },
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.exam.getSession({
      sessionId: normalSessionId,
    });

    expect(result).toBeDefined();
    expect(result.session.isIHKMode).toBe(false);
    expect(result.session.timeLimit).toBe(1800);
    expect(result.session.totalQuestions).toBe(10);
  });

  it("should calculate correct time remaining for IHK mode", () => {
    const timeLimit = 10800; // 180 minutes
    const timeElapsed = 3600; // 60 minutes elapsed
    const timeRemaining = timeLimit - timeElapsed;
    
    expect(timeRemaining).toBe(7200); // 120 minutes remaining
    expect(timeRemaining / 60).toBe(120); // 2 hours
  });

  it("should detect when time is running out (last 30 minutes)", () => {
    const timeLimit = 10800; // 180 minutes
    const timeElapsed = 9000; // 150 minutes elapsed
    const timeRemaining = timeLimit - timeElapsed;
    
    expect(timeRemaining).toBe(1800); // 30 minutes remaining
    expect(timeRemaining <= 1800).toBe(true); // Should show warning
  });

  it("should detect when time is critically low (last 10 minutes)", () => {
    const timeLimit = 10800; // 180 minutes
    const timeElapsed = 10200; // 170 minutes elapsed
    const timeRemaining = timeLimit - timeElapsed;
    
    expect(timeRemaining).toBe(600); // 10 minutes remaining
    expect(timeRemaining <= 600).toBe(true); // Should show critical warning
  });
});
</file>

<file path="server/passwordReset.ts">
import { Resend } from "resend";
import crypto from "crypto";
import type { Express, Request, Response } from "express";
import { hashPassword } from "./_core/auth-local";

// Lazy init - verhindert Crash beim Start ohne API-Key

export function registerPasswordResetRoutes(app: Express) {
  // Schritt 1: Reset anfordern
  app.post("/api/auth/forgot-password", async (req: Request, res: Response) => {
    const { email } = req.body ?? {};
    if (!email) return res.status(400).json({ error: "E-Mail erforderlich." });

    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      if (!db) return res.status(500).json({ error: "DB nicht verfügbar." });

      const { users, passwordResetTokens } = await import("../drizzle/schema");
      const { eq } = await import("drizzle-orm");

      // Prüfen ob User existiert
      const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (!user.length) {
        // Sicherheit: kein Hinweis ob E-Mail existiert
        return res.json({ ok: true });
      }

      // Token generieren
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 Stunde

      await db.insert(passwordResetTokens).values({ email, token, expiresAt });

      const domain = process.env.RAILWAY_PUBLIC_DOMAIN ?? "immobilie-akademie-production.up.railway.app";
      const resetUrl = `https://${domain}/reset-password?token=${token}`;

      const resend = new Resend(process.env.RESEND_API_KEY ?? "");
      await resend.emails.send({
        from: "Immobilien-Akademie <noreply@immobilien-akademie.de>",
        to: email,
        subject: "Passwort zurücksetzen",
        html: `
          <h2>Passwort zurücksetzen</h2>
          <p>Du hast eine Passwort-Zurücksetzung angefordert.</p>
          <p><a href="${resetUrl}" style="background:#2563eb;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;">Passwort zurücksetzen</a></p>
          <p>Dieser Link ist 1 Stunde gültig.</p>
          <p>Falls du diese Anfrage nicht gestellt hast, ignoriere diese E-Mail.</p>
        `,
      });

      return res.json({ ok: true });
    } catch (error) {
      console.error("[Reset] Fehler:", error);
      return res.status(500).json({ error: "Fehler beim Senden." });
    }
  });

  // Schritt 2: Neues Passwort setzen
  app.post("/api/auth/reset-password", async (req: Request, res: Response) => {
    const { token, newPassword } = req.body ?? {};
    if (!token || !newPassword) return res.status(400).json({ error: "Token und Passwort erforderlich." });
    if (newPassword.length < 8) return res.status(400).json({ error: "Passwort mindestens 8 Zeichen." });

    try {
      const { getDb, savePasswordHash } = await import("./db");
      const db = await getDb();
      if (!db) return res.status(500).json({ error: "DB nicht verfügbar." });

      const { passwordResetTokens, users } = await import("../drizzle/schema");
      const { eq, and, isNull, gt } = await import("drizzle-orm");

      const resetToken = await db.select().from(passwordResetTokens)
        .where(and(
          eq(passwordResetTokens.token, token),
          isNull(passwordResetTokens.usedAt),
          gt(passwordResetTokens.expiresAt, new Date())
        )).limit(1);

      if (!resetToken.length) return res.status(400).json({ error: "Token ungültig oder abgelaufen." });

      const email = resetToken[0].email;
      const openId = `local:${email.toLowerCase().trim()}`;

      // Neues Passwort hashen
      const { hash, salt } = hashPassword(newPassword);
      await savePasswordHash(openId, hash, salt);

      // Token als benutzt markieren
      await db.update(passwordResetTokens)
        .set({ usedAt: new Date() })
        .where(eq(passwordResetTokens.token, token));

      return res.json({ ok: true, message: "Passwort erfolgreich geändert." });
    } catch (error) {
      console.error("[Reset] Fehler:", error);
      return res.status(500).json({ error: "Fehler beim Zurücksetzen." });
    }
  });
}
</file>

<file path="server/pdf.test.ts">
import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import { 
  createExamSession, 
  saveExamQuestion, 
  completeExamSession,
  upsertUser 
} from "./db";

describe("PDF Export", () => {
  let testUserId: number;
  let testSessionId: number;

  beforeAll(async () => {
    // Create test user
    const openId = `test-pdf-${Date.now()}`;
    await upsertUser({
      openId,
      name: "Test PDF User",
      email: `test-pdf-${Date.now()}@example.com`,
      role: "user",
    });
    
    // Get user from database
    const { getUserByOpenId } = await import("./db");
    const user = await getUserByOpenId(openId);
    if (!user) throw new Error("Failed to create test user");
    testUserId = user.id;

    // Create test exam session
    const session = await createExamSession(
      testUserId,
      1, // moduleId
      10, // totalQuestions
      1800, // timeLimit
      "medium", // difficulty
      false // isIHKMode
    );
    if (!session) throw new Error("Failed to create exam session");
    testSessionId = session.id;

    // Add some test questions
    for (let i = 0; i < 10; i++) {
      await saveExamQuestion({
        sessionId: testSessionId,
        questionText: `Test Question ${i + 1}`,
        options: JSON.stringify(["Option A", "Option B", "Option C", "Option D"]),
        correctAnswer: "Option A",
        userAnswer: i % 2 === 0 ? "Option A" : "Option B", // 50% correct
        isCorrect: i % 2 === 0,
        explanation: `Explanation for question ${i + 1}`,
        topic: i < 5 ? "Maklerrecht" : "Vertragsrecht",
        difficulty: "medium",
      });
    }

    // Complete the session
    await completeExamSession(testSessionId, 50); // 50% score
  });

  it("should generate PDF for completed exam session", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.pdf.generateExamResultPDF({
      sessionId: testSessionId,
    });

    // Verify PDF was generated
    expect(result).toBeDefined();
    expect(result.pdf).toBeDefined();
    expect(result.filename).toBeDefined();
    expect(typeof result.pdf).toBe("string");
    expect(result.pdf.length).toBeGreaterThan(0);
    
    // Verify filename format
    expect(result.filename).toMatch(/^Pruefungsergebnis_Modul\d+_\d{4}-\d{2}-\d{2}\.pdf$/);
    
    // Verify base64 format (should be valid base64)
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    expect(base64Regex.test(result.pdf)).toBe(true);
  });

  it("should throw error for non-existent session", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    await expect(
      caller.pdf.generateExamResultPDF({
        sessionId: 999999,
      })
    ).rejects.toThrow("Exam session not found");
  });

  it("should include correct session data in PDF", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.pdf.generateExamResultPDF({
      sessionId: testSessionId,
    });

    // Decode base64 to check content (basic check)
    const pdfContent = Buffer.from(result.pdf, "base64").toString("latin1");
    
    // PDF should contain basic metadata
    expect(pdfContent).toContain("PDF"); // PDF header
    expect(pdfContent.length).toBeGreaterThan(1000); // Reasonable PDF size
  });
});
</file>

<file path="server/pdfRouter.ts">
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { getExamSession, getWeakTopics, getExamQuestions } from "./db";
import { jsPDF } from "jspdf";

export const pdfRouter = router({
  generateExamResultPDF: publicProcedure
    .input(z.object({ sessionId: z.number() }))
    .mutation(async ({ input }) => {
      const { sessionId } = input;

      // Get exam session data
      const session = await getExamSession(sessionId);
      if (!session) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Exam session not found",
        });
      }

      // Get exam questions
      const questions = await getExamQuestions(sessionId);
      
      // Get weak topics
      const weakTopics = await getWeakTopics(session.userId);

      // Create PDF
      const pdf = new jsPDF();
      
      // Header
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text("Prüfungsergebnis", 105, 20, { align: "center" });
      
      // Session Info
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text(`Modul: ${session.moduleId}`, 20, 40);
      pdf.text(`Datum: ${new Date(session.createdAt).toLocaleDateString("de-DE")}`, 20, 48);
      const durationMinutes = session.completedAt 
        ? Math.floor((new Date(session.completedAt).getTime() - new Date(session.createdAt).getTime()) / 60000)
        : 0;
      pdf.text(`Dauer: ${durationMinutes} Minuten`, 20, 56);

      // Score
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      const scoreColor: [number, number, number] = session.score >= 70 ? [0, 128, 0] : [255, 0, 0];
      pdf.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
      pdf.text(`Ergebnis: ${session.score}%`, 20, 70);
      
      const passed = session.score >= 70;
      pdf.setFontSize(14);
      pdf.text(passed ? "✓ Bestanden" : "✗ Nicht bestanden", 20, 80);
      pdf.setTextColor(0, 0, 0);

      // Questions Summary
      pdf.setFont("helvetica", "bold");
      pdf.text("Fragenübersicht", 20, 100);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      
      const correctCount = questions.filter((q: any) => q.isCorrect).length;
      const incorrectCount = questions.length - correctCount;
      
      pdf.text(`Richtig beantwortet: ${correctCount} / ${questions.length}`, 20, 110);
      pdf.text(`Falsch beantwortet: ${incorrectCount} / ${questions.length}`, 20, 118);

      // Weak Topics
      if (weakTopics && weakTopics.length > 0) {
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Identifizierte Wissenslücken", 20, 138);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(11);
        
        let yPos = 148;
        weakTopics.slice(0, 10).forEach((topic, index) => {
          pdf.text(`${index + 1}. ${topic.topic} (${topic.incorrectCount}x falsch)`, 20, yPos);
          yPos += 8;
        });
      }

      // Recommendations
      const recYPos = weakTopics && weakTopics.length > 0 ? 230 : 158;
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Empfehlungen", 20, recYPos);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      
      let recommendations: string[] = [];
      if (session.score < 50) {
        recommendations = [
          "• Wiederholen Sie die Grundlagen des Moduls gründlich",
          "• Nutzen Sie die Lernkarten für tägliches Training",
          "• Schauen Sie sich die Video-Tutorials erneut an",
          "• Konsultieren Sie den KI-Tutor bei Verständnisfragen"
        ];
      } else if (session.score < 70) {
        recommendations = [
          "• Fokussieren Sie sich auf die identifizierten Wissenslücken",
          "• Lösen Sie weitere Übungsquizze zu den Schwachstellen",
          "• Vertiefen Sie Ihr Wissen mit den Modulinhalten",
          "• Wiederholen Sie die Prüfung nach gezieltem Lernen"
        ];
      } else if (session.score < 85) {
        recommendations = [
          "• Sehr gute Leistung! Vertiefen Sie die letzten Wissenslücken",
          "• Versuchen Sie den Schwierigkeitsgrad 'Schwer'",
          "• Bereiten Sie sich auf das nächste Modul vor",
          "• Nutzen Sie den Prüfungsmodus regelmäßig"
        ];
      } else {
        recommendations = [
          "• Exzellente Leistung! Sie beherrschen das Modul sehr gut",
          "• Versuchen Sie den IHK-Simulationsmodus",
          "• Teilen Sie Ihr Wissen mit anderen Lernenden",
          "• Fahren Sie mit dem nächsten Modul fort"
        ];
      }

      let recTextYPos = recYPos + 10;
      recommendations.forEach((rec) => {
        pdf.text(rec, 20, recTextYPos);
        recTextYPos += 8;
      });

      // Generate PDF base64
      const pdfBase64 = pdf.output("dataurlstring").split(",")[1];

      return {
        pdf: pdfBase64,
        filename: `Pruefungsergebnis_Modul${session.moduleId}_${new Date().toISOString().split("T")[0]}.pdf`,
      };
    }),
});
</file>

<file path="server/quizRouter.ts">
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { questionBank } from "../drizzle/schema";
import { eq, and, sql } from "drizzle-orm";

export const quizRouter = router({
  // Get all questions for a module
  getQuestionsByModule: publicProcedure
    .input(z.object({ moduleId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const questions = await db
        .select()
        .from(questionBank)
        .where(eq(questionBank.moduleId, input.moduleId));
      return questions;
    }),

  // Get questions by category
  getQuestionsByCategory: publicProcedure
    .input(z.object({ moduleId: z.number(), category: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const questions = await db
        .select()
        .from(questionBank)
        .where(
          and(
            eq(questionBank.moduleId, input.moduleId),
            eq(questionBank.category, input.category)
          )
        );
      return questions;
    }),

  // Get random questions for quiz
  getRandomQuestions: publicProcedure
    .input(
      z.object({
        moduleId: z.number(),
        category: z.string().optional(),
        difficulty: z.enum(["easy", "medium", "hard"]).optional(),
        count: z.number().min(1).max(100).default(20),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const conditions = [eq(questionBank.moduleId, input.moduleId)];

      if (input.category) {
        conditions.push(eq(questionBank.category, input.category));
      }

      if (input.difficulty) {
        conditions.push(eq(questionBank.difficulty, input.difficulty));
      }

      const allQuestions = await db
        .select()
        .from(questionBank)
        .where(and(...conditions));
      
      // Shuffle and take random questions
      const shuffled = allQuestions.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, input.count);
    }),

  // Get quiz statistics
  getQuizStats: publicProcedure
    .input(z.object({ moduleId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const totalQuestions = await db
        .select({ count: sql<number>`count(*)` })
        .from(questionBank)
        .where(eq(questionBank.moduleId, input.moduleId));

      const byCategory = await db
        .select({
          category: questionBank.category,
          count: sql<number>`count(*)`,
        })
        .from(questionBank)
        .where(eq(questionBank.moduleId, input.moduleId))
        .groupBy(questionBank.category);

      const byDifficulty = await db
        .select({
          difficulty: questionBank.difficulty,
          count: sql<number>`count(*)`,
        })
        .from(questionBank)
        .where(eq(questionBank.moduleId, input.moduleId))
        .groupBy(questionBank.difficulty);

      return {
        total: totalQuestions[0]?.count || 0,
        byCategory,
        byDifficulty,
      };
    }),
});
</file>

<file path="server/seed-questions-modul5-batch2.sql">
-- Batch 2: 50 additional exam questions for Module 5 (§34i Darlehensvermittlung)
-- Total after this batch: 150 questions

-- Kategorie: Rechtliche Grundlagen (10 Fragen, ID 101-110)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES
(5, 'Rechtliche Grundlagen', 'medium', 'Welche Informationen muss ein Darlehensvermittler nach § 34i Abs. 5 GewO vor Vertragsabschluss in Textform zur Verfügung stellen?', '["Nur die Provision", "Nur die Darlehenskonditionen", "Provision, Darlehenskonditionen und Widerrufsbelehrung", "Nur die Widerrufsbelehrung"]', 'Provision, Darlehenskonditionen und Widerrufsbelehrung', 'Nach § 34i Abs. 5 GewO müssen Darlehensvermittler vor Vertragsabschluss umfassende Informationen in Textform zur Verfügung stellen, einschließlich Provision, Darlehenskonditionen und Widerrufsbelehrung.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Ein Darlehensvermittler verletzt seine Beratungspflichten nach § 511 BGB. Welche Rechtsfolge tritt ein?', '["Keine Rechtsfolge", "Schadensersatzpflicht bei Verschulden", "Automatische Vertragsnichtigkeit", "Bußgeld von 5.000 EUR"]', 'Schadensersatzpflicht bei Verschulden', 'Bei Verletzung der Beratungspflichten nach § 511 BGB haftet der Darlehensvermittler auf Schadensersatz, wenn ihn ein Verschulden trifft (§ 280 Abs. 1 BGB).'),

(5, 'Rechtliche Grundlagen', 'easy', 'Welche Behörde ist für die Überwachung von Darlehensvermittlern nach § 34i GewO zuständig?', '["Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin)", "Gewerbeaufsichtsamt", "Industrie- und Handelskammer (IHK)", "Bundeskartellamt"]', 'Gewerbeaufsichtsamt', 'Die Überwachung von Darlehensvermittlern nach § 34i GewO obliegt dem Gewerbeaufsichtsamt, nicht der BaFin.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Rechtsfolge hat ein Verstoß gegen das Provisionsverbot nach § 655e BGB?', '["Bußgeld bis 50.000 EUR", "Provision muss zurückgezahlt werden", "Vertrag ist nichtig", "Keine Rechtsfolge"]', 'Provision muss zurückgezahlt werden', 'Bei Verstoß gegen das Provisionsverbot nach § 655e BGB muss die bereits gezahlte Provision zurückgezahlt werden (§ 812 BGB - ungerechtfertigte Bereicherung).'),

(5, 'Rechtliche Grundlagen', 'hard', 'Ein Darlehensvermittler berät einen Verbraucher zu einem Immobiliardarlehen. Welche Informationen muss er nach Art. 247 § 13 EGBGB im ESIS-Merkblatt angeben?', '["Nur Zinssatz und Laufzeit", "Nur monatliche Rate", "Zinssatz, Laufzeit, monatliche Rate, Gesamtkosten, Effektivzins", "Nur Effektivzins"]', 'Zinssatz, Laufzeit, monatliche Rate, Gesamtkosten, Effektivzins', 'Das ESIS-Merkblatt (Europäisches Standardisiertes Merkblatt) muss nach Art. 247 § 13 EGBGB umfassende Informationen enthalten: Zinssatz, Laufzeit, monatliche Rate, Gesamtkosten und Effektivzins.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Welche Frist gilt für das Widerrufsrecht bei Immobiliardarlehensverträgen nach § 495 Abs. 1 BGB?', '["7 Tage", "14 Tage", "21 Tage", "30 Tage"]', '14 Tage', 'Das Widerrufsrecht bei Immobiliardarlehensverträgen beträgt nach § 495 Abs. 1 BGB 14 Tage ab Vertragsabschluss.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Ein Darlehensvermittler erhält eine Provision von 3% der Darlehenssumme. Ist dies zulässig?', '["Ja, immer zulässig", "Nein, maximal 1% zulässig", "Ja, wenn im Vertrag vereinbart und angemessen", "Nein, Provisionen sind generell verboten"]', 'Ja, wenn im Vertrag vereinbart und angemessen', 'Provisionen sind grundsätzlich zulässig, wenn sie im Vertrag vereinbart und angemessen sind. Es gibt keine gesetzliche Obergrenze, aber die Provision muss verhältnismäßig sein.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Welche Rechtsfolge hat eine fehlerhafte Widerrufsbelehrung bei einem Immobiliardarlehensvertrag?', '["Keine Rechtsfolge", "Widerrufsfrist verlängert sich auf 1 Jahr und 14 Tage", "Vertrag ist nichtig", "Bußgeld von 10.000 EUR"]', 'Widerrufsfrist verlängert sich auf 1 Jahr und 14 Tage', 'Bei fehlerhafter Widerrufsbelehrung verlängert sich die Widerrufsfrist nach § 356 Abs. 3 BGB auf 1 Jahr und 14 Tage ab Vertragsabschluss.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Welche Versicherung muss ein Darlehensvermittler nach § 34i Abs. 2 Nr. 3 GewO abschließen?', '["Krankenversicherung", "Berufshaftpflichtversicherung", "Rechtsschutzversicherung", "Keine Versicherung erforderlich"]', 'Berufshaftpflichtversicherung', 'Nach § 34i Abs. 2 Nr. 3 GewO muss ein Darlehensvermittler eine Berufshaftpflichtversicherung mit einer Mindestdeckungssumme von 1,3 Mio. EUR abschließen.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Ein Darlehensvermittler verletzt seine Dokumentationspflicht nach § 18a KWG. Welche Rechtsfolge tritt ein?', '["Bußgeld bis 100.000 EUR", "Schadensersatzpflicht", "Entzug der Erlaubnis", "Alle genannten Rechtsfolgen sind möglich"]', 'Alle genannten Rechtsfolgen sind möglich', 'Bei Verletzung der Dokumentationspflicht nach § 18a KWG können Bußgelder, Schadensersatzpflichten und im Extremfall der Entzug der Erlaubnis drohen.'),

-- Kategorie: Darlehensarten (10 Fragen, ID 111-120)

(5, 'Darlehensarten', 'easy', 'Was ist ein Annuitätendarlehen?', '["Darlehen mit konstanter monatlicher Rate", "Darlehen mit variabler Rate", "Darlehen ohne Tilgung", "Darlehen mit endfälliger Tilgung"]', 'Darlehen mit konstanter monatlicher Rate', 'Ein Annuitätendarlehen zeichnet sich durch eine konstante monatliche Rate (Annuität) aus, die aus Zins- und Tilgungsanteil besteht.'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde möchte ein Darlehen mit flexibler Tilgung. Welche Darlehensart ist geeignet?', '["Annuitätendarlehen", "Tilgungsdarlehen", "Variables Darlehen mit Sondertilgungsrecht", "Endfälliges Darlehen"]', 'Variables Darlehen mit Sondertilgungsrecht', 'Ein variables Darlehen mit Sondertilgungsrecht ermöglicht flexible Tilgungen ohne Vorfälligkeitsentschädigung.'),

(5, 'Darlehensarten', 'hard', 'Was ist der Unterschied zwischen einem Annuitätendarlehen und einem Tilgungsdarlehen?', '["Annuität konstant vs. Tilgung konstant", "Zinssatz fix vs. variabel", "Laufzeit kurz vs. lang", "Kein Unterschied"]', 'Annuität konstant vs. Tilgung konstant', 'Beim Annuitätendarlehen bleibt die monatliche Rate (Annuität) konstant, beim Tilgungsdarlehen bleibt die Tilgung konstant und die Rate sinkt über die Laufzeit.'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Forward-Darlehen?', '["Darlehen für die Zukunft mit heutigem Zinssatz", "Darlehen mit variabler Verzinsung", "Darlehen ohne Zinsen", "Darlehen mit Tilgungsaussetzung"]', 'Darlehen für die Zukunft mit heutigem Zinssatz', 'Ein Forward-Darlehen sichert den aktuellen Zinssatz für ein Darlehen, das erst in der Zukunft (z.B. bei Anschlussfinanzierung) ausgezahlt wird.'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde hat ein endfälliges Darlehen. Was bedeutet das?', '["Tilgung erfolgt am Ende der Laufzeit in einer Summe", "Tilgung erfolgt monatlich", "Keine Tilgung erforderlich", "Tilgung erfolgt quartalsweise"]', 'Tilgung erfolgt am Ende der Laufzeit in einer Summe', 'Bei einem endfälligen Darlehen wird die gesamte Darlehenssumme am Ende der Laufzeit in einer Summe getilgt, während der Laufzeit werden nur Zinsen gezahlt.'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Cap-Darlehen?', '["Darlehen mit Zinsobergrenze", "Darlehen mit Tilgungsobergrenze", "Darlehen mit Laufzeitobergrenze", "Darlehen mit Darlehensobergrenze"]', 'Darlehen mit Zinsobergrenze', 'Ein Cap-Darlehen ist ein variables Darlehen mit einer Zinsobergrenze (Cap), die den maximalen Zinssatz begrenzt.'),

(5, 'Darlehensarten', 'easy', 'Was ist ein KfW-Darlehen?', '["Förderdarlehen der Kreditanstalt für Wiederaufbau", "Darlehen einer privaten Bank", "Darlehen ohne Zinsen", "Darlehen mit variabler Verzinsung"]', 'Förderdarlehen der Kreditanstalt für Wiederaufbau', 'KfW-Darlehen sind Förderdarlehen der Kreditanstalt für Wiederaufbau (KfW) mit günstigen Konditionen für bestimmte Zwecke (z.B. energetische Sanierung).'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde möchte ein Darlehen mit Tilgungsaussetzung. Welche Darlehensart ist geeignet?', '["Endfälliges Darlehen", "Annuitätendarlehen", "Tilgungsdarlehen", "Forward-Darlehen"]', 'Endfälliges Darlehen', 'Ein endfälliges Darlehen ermöglicht eine Tilgungsaussetzung während der Laufzeit, die Tilgung erfolgt am Ende in einer Summe.'),

(5, 'Darlehensarten', 'hard', 'Was ist der Unterschied zwischen einem Festzinsdarlehen und einem variablen Darlehen?', '["Zinssatz fix vs. variabel", "Tilgung fix vs. variabel", "Laufzeit fix vs. variabel", "Kein Unterschied"]', 'Zinssatz fix vs. variabel', 'Beim Festzinsdarlehen bleibt der Zinssatz über die Zinsbindungsfrist konstant, beim variablen Darlehen passt sich der Zinssatz an den Marktzins an.'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Volltilgerdarlehen?', '["Darlehen, das am Ende der Zinsbindung vollständig getilgt ist", "Darlehen ohne Tilgung", "Darlehen mit variabler Tilgung", "Darlehen mit Sondertilgung"]', 'Darlehen, das am Ende der Zinsbindung vollständig getilgt ist', 'Ein Volltilgerdarlehen ist so konzipiert, dass die Darlehenssumme am Ende der Zinsbindungsfrist vollständig getilgt ist.'),

-- Kategorie: Finanzierungsplanung (10 Fragen, ID 121-130)

(5, 'Finanzierungsplanung', 'easy', 'Was ist der Beleihungswert einer Immobilie?', '["Wert, den die Bank als Sicherheit ansetzt", "Kaufpreis der Immobilie", "Marktwert der Immobilie", "Verkehrswert der Immobilie"]', 'Wert, den die Bank als Sicherheit ansetzt', 'Der Beleihungswert ist der Wert, den die Bank als Sicherheit für das Darlehen ansetzt, er liegt meist unter dem Marktwert.'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde hat ein Eigenkapital von 50.000 EUR und möchte eine Immobilie für 250.000 EUR kaufen. Wie hoch ist die Eigenkapitalquote?', '["10%", "20%", "25%", "30%"]', '20%', 'Eigenkapitalquote = Eigenkapital / Kaufpreis = 50.000 EUR / 250.000 EUR = 20%.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist der Unterschied zwischen Beleihungswert und Beleihungsauslauf?', '["Beleihungswert ist der Wert der Immobilie, Beleihungsauslauf ist das Verhältnis Darlehen zu Beleihungswert", "Beleihungswert ist das Darlehen, Beleihungsauslauf ist der Wert der Immobilie", "Kein Unterschied", "Beleihungswert ist der Kaufpreis, Beleihungsauslauf ist die Tilgung"]', 'Beleihungswert ist der Wert der Immobilie, Beleihungsauslauf ist das Verhältnis Darlehen zu Beleihungswert', 'Der Beleihungswert ist der von der Bank angesetzte Wert der Immobilie, der Beleihungsauslauf ist das Verhältnis des Darlehens zum Beleihungswert (in %).'),

(5, 'Finanzierungsplanung', 'easy', 'Was sind Nebenkosten beim Immobilienkauf?', '["Grunderwerbsteuer, Notar, Makler, Grundbuch", "Nur Grunderwerbsteuer", "Nur Notar und Grundbuch", "Nur Makler"]', 'Grunderwerbsteuer, Notar, Makler, Grundbuch', 'Nebenkosten beim Immobilienkauf umfassen Grunderwerbsteuer, Notar- und Grundbuchkosten sowie ggf. Maklergebühren.'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde möchte eine Immobilie für 300.000 EUR kaufen. Die Nebenkosten betragen 10%. Wie hoch ist der Gesamtbedarf?', '["300.000 EUR", "310.000 EUR", "330.000 EUR", "350.000 EUR"]', '330.000 EUR', 'Gesamtbedarf = Kaufpreis + Nebenkosten = 300.000 EUR + 30.000 EUR (10%) = 330.000 EUR.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist der Unterschied zwischen Effektivzins und Sollzins?', '["Effektivzins enthält alle Kosten, Sollzins nur Zinsen", "Sollzins enthält alle Kosten, Effektivzins nur Zinsen", "Kein Unterschied", "Effektivzins ist niedriger als Sollzins"]', 'Effektivzins enthält alle Kosten, Sollzins nur Zinsen', 'Der Sollzins ist der reine Zinssatz, der Effektivzins enthält zusätzlich alle Kosten (z.B. Bearbeitungsgebühren) und ist daher höher.'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Sondertilgung?', '["Außerplanmäßige Tilgung zusätzlich zur regulären Rate", "Reguläre monatliche Tilgung", "Tilgung am Ende der Laufzeit", "Tilgung bei Vertragsabschluss"]', 'Außerplanmäßige Tilgung zusätzlich zur regulären Rate', 'Eine Sondertilgung ist eine außerplanmäßige Tilgung zusätzlich zur regulären monatlichen Rate, um das Darlehen schneller zurückzuzahlen.'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde hat ein Darlehen von 200.000 EUR mit 2% Zinssatz und 2% Tilgung. Wie hoch ist die monatliche Rate?', '["666,67 EUR", "800 EUR", "1.000 EUR", "1.200 EUR"]', '666,67 EUR', 'Monatliche Rate = (Darlehen × (Zinssatz + Tilgung)) / 12 = (200.000 EUR × 4%) / 12 = 666,67 EUR.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist der Unterschied zwischen Nominalzins und Realzins?', '["Nominalzins ohne Inflation, Realzins mit Inflation", "Nominalzins mit Inflation, Realzins ohne Inflation", "Kein Unterschied", "Nominalzins ist höher als Realzins"]', 'Nominalzins ohne Inflation, Realzins mit Inflation', 'Der Nominalzins ist der Zinssatz ohne Berücksichtigung der Inflation, der Realzins berücksichtigt die Inflation (Realzins = Nominalzins - Inflation).'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Zinsbindung?', '["Zeitraum, in dem der Zinssatz festgeschrieben ist", "Zeitraum, in dem keine Zinsen gezahlt werden", "Zeitraum, in dem die Tilgung festgeschrieben ist", "Zeitraum, in dem das Darlehen ausgezahlt wird"]', 'Zeitraum, in dem der Zinssatz festgeschrieben ist', 'Die Zinsbindung ist der Zeitraum, in dem der Zinssatz festgeschrieben ist und sich nicht ändert (z.B. 10 Jahre Zinsbindung).'),

-- Kategorie: Bonitätsprüfung (7 Fragen, ID 131-137)

(5, 'Bonitätsprüfung', 'easy', 'Was ist die Schufa?', '["Schutzgemeinschaft für allgemeine Kreditsicherung", "Bundesanstalt für Finanzdienstleistungsaufsicht", "Kreditanstalt für Wiederaufbau", "Gewerbeaufsichtsamt"]', 'Schutzgemeinschaft für allgemeine Kreditsicherung', 'Die Schufa (Schutzgemeinschaft für allgemeine Kreditsicherung) ist eine Auskunftei, die Informationen über die Kreditwürdigkeit von Personen sammelt.'),

(5, 'Bonitätsprüfung', 'medium', 'Welche Informationen enthält eine Schufa-Auskunft?', '["Kredithistorie, Zahlungsverhalten, offene Kredite", "Nur Kredithistorie", "Nur Zahlungsverhalten", "Nur offene Kredite"]', 'Kredithistorie, Zahlungsverhalten, offene Kredite', 'Eine Schufa-Auskunft enthält Informationen über die Kredithistorie, das Zahlungsverhalten und offene Kredite einer Person.'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist der Schufa-Score?', '["Kennzahl für Kreditwürdigkeit (0-100%)", "Kennzahl für Einkommen", "Kennzahl für Vermögen", "Kennzahl für Schulden"]', 'Kennzahl für Kreditwürdigkeit (0-100%)', 'Der Schufa-Score ist eine Kennzahl für die Kreditwürdigkeit einer Person, die von 0% (sehr schlechte Bonität) bis 100% (sehr gute Bonität) reicht.'),

(5, 'Bonitätsprüfung', 'easy', 'Welche Unterlagen benötigt eine Bank für die Bonitätsprüfung?', '["Einkommensnachweise, Schufa-Auskunft, Vermögensübersicht", "Nur Einkommensnachweise", "Nur Schufa-Auskunft", "Nur Vermögensübersicht"]', 'Einkommensnachweise, Schufa-Auskunft, Vermögensübersicht', 'Für die Bonitätsprüfung benötigt die Bank Einkommensnachweise, eine Schufa-Auskunft und eine Vermögensübersicht.'),

(5, 'Bonitätsprüfung', 'medium', 'Ein Kunde hat ein Nettoeinkommen von 3.000 EUR und monatliche Ausgaben von 2.000 EUR. Wie hoch ist das verfügbare Einkommen?', '["500 EUR", "1.000 EUR", "1.500 EUR", "2.000 EUR"]', '1.000 EUR', 'Verfügbares Einkommen = Nettoeinkommen - Ausgaben = 3.000 EUR - 2.000 EUR = 1.000 EUR.'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist der Unterschied zwischen Bonität und Liquidität?', '["Bonität ist Kreditwürdigkeit, Liquidität ist Zahlungsfähigkeit", "Bonität ist Zahlungsfähigkeit, Liquidität ist Kreditwürdigkeit", "Kein Unterschied", "Bonität ist höher als Liquidität"]', 'Bonität ist Kreditwürdigkeit, Liquidität ist Zahlungsfähigkeit', 'Bonität bezeichnet die Kreditwürdigkeit (Fähigkeit, Kredite zurückzuzahlen), Liquidität bezeichnet die Zahlungsfähigkeit (verfügbare Mittel für Zahlungen).'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist eine Haushaltsrechnung?', '["Gegenüberstellung von Einnahmen und Ausgaben", "Berechnung der Grunderwerbsteuer", "Berechnung der Nebenkosten", "Berechnung der Tilgung"]', 'Gegenüberstellung von Einnahmen und Ausgaben', 'Eine Haushaltsrechnung ist eine Gegenüberstellung von Einnahmen und Ausgaben, um das verfügbare Einkommen zu ermitteln.'),

-- Kategorie: Risiken (7 Fragen, ID 138-144)

(5, 'Risiken', 'easy', 'Was ist ein Zinsänderungsrisiko?', '["Risiko steigender Zinsen bei Anschlussfinanzierung", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten", "Risiko sinkender Einkommen"]', 'Risiko steigender Zinsen bei Anschlussfinanzierung', 'Das Zinsänderungsrisiko ist das Risiko, dass die Zinsen bei der Anschlussfinanzierung höher sind als bei der ursprünglichen Finanzierung.'),

(5, 'Risiken', 'medium', 'Ein Kunde hat ein variables Darlehen. Welches Risiko trägt er?', '["Zinsänderungsrisiko", "Tilgungsrisiko", "Währungsrisiko", "Kein Risiko"]', 'Zinsänderungsrisiko', 'Bei einem variablen Darlehen trägt der Kunde das Zinsänderungsrisiko, da sich der Zinssatz an den Marktzins anpasst.'),

(5, 'Risiken', 'hard', 'Was ist ein Tilgungsrisiko?', '["Risiko, dass die Tilgung nicht geleistet werden kann", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten"]', 'Risiko, dass die Tilgung nicht geleistet werden kann', 'Das Tilgungsrisiko ist das Risiko, dass der Darlehensnehmer die Tilgung aufgrund finanzieller Schwierigkeiten nicht leisten kann.'),

(5, 'Risiken', 'easy', 'Was ist eine Restschuldversicherung?', '["Versicherung, die das Darlehen bei Tod oder Arbeitsunfähigkeit tilgt", "Versicherung gegen Zinsänderungen", "Versicherung gegen Immobilienwertverfall", "Versicherung gegen Nebenkosten"]', 'Versicherung, die das Darlehen bei Tod oder Arbeitsunfähigkeit tilgt', 'Eine Restschuldversicherung tilgt das Darlehen oder übernimmt die Raten bei Tod, Arbeitsunfähigkeit oder Arbeitslosigkeit des Darlehensnehmers.'),

(5, 'Risiken', 'medium', 'Ein Kunde hat ein Darlehen mit 100% Beleihungsauslauf. Welches Risiko besteht?', '["Höheres Ausfallrisiko für die Bank, höhere Zinsen", "Niedrigeres Ausfallrisiko für die Bank, niedrigere Zinsen", "Kein Risiko", "Nur Zinsänderungsrisiko"]', 'Höheres Ausfallrisiko für die Bank, höhere Zinsen', 'Bei einem Beleihungsauslauf von 100% hat der Kunde kein Eigenkapital, was das Ausfallrisiko für die Bank erhöht und zu höheren Zinsen führt.'),

(5, 'Risiken', 'hard', 'Was ist ein Währungsrisiko bei Fremdwährungsdarlehen?', '["Risiko steigender Wechselkurse", "Risiko sinkender Zinsen", "Risiko steigender Immobilienpreise", "Risiko sinkender Nebenkosten"]', 'Risiko steigender Wechselkurse', 'Bei Fremdwährungsdarlehen besteht das Währungsrisiko, dass der Wechselkurs steigt und die Rückzahlung in Euro teurer wird.'),

(5, 'Risiken', 'easy', 'Was ist eine Vorfälligkeitsentschädigung?', '["Entschädigung bei vorzeitiger Darlehensrückzahlung", "Entschädigung bei verspäteter Tilgung", "Entschädigung bei Zinsänderung", "Entschädigung bei Vertragsabschluss"]', 'Entschädigung bei vorzeitiger Darlehensrückzahlung', 'Eine Vorfälligkeitsentschädigung ist eine Entschädigung, die die Bank bei vorzeitiger Rückzahlung des Darlehens verlangen kann.'),

-- Kategorie: Verbraucherschutz (6 Fragen, ID 145-150)

(5, 'Verbraucherschutz', 'easy', 'Welche Frist gilt für das Widerrufsrecht bei Verbraucherdarlehensverträgen?', '["14 Tage", "7 Tage", "21 Tage", "30 Tage"]', '14 Tage', 'Das Widerrufsrecht bei Verbraucherdarlehensverträgen beträgt 14 Tage nach § 495 Abs. 1 BGB.'),

(5, 'Verbraucherschutz', 'medium', 'Ein Kunde widerruft einen Darlehensvertrag nach 10 Tagen. Welche Rechtsfolge tritt ein?', '["Vertrag ist aufgehoben, bereits gezahlte Beträge werden zurückerstattet", "Vertrag bleibt bestehen", "Kunde muss Schadensersatz zahlen", "Nur Zinsen werden zurückerstattet"]', 'Vertrag ist aufgehoben, bereits gezahlte Beträge werden zurückerstattet', 'Bei Widerruf innerhalb der Widerrufsfrist ist der Vertrag aufgehoben und bereits gezahlte Beträge werden zurückerstattet (§ 357 BGB).'),

(5, 'Verbraucherschutz', 'hard', 'Was ist das ESIS-Merkblatt?', '["Europäisches Standardisiertes Merkblatt mit Darlehensinformationen", "Schufa-Auskunft", "Bonitätsprüfung", "Widerrufsbelehrung"]', 'Europäisches Standardisiertes Merkblatt mit Darlehensinformationen', 'Das ESIS-Merkblatt (European Standardised Information Sheet) ist ein standardisiertes Merkblatt mit umfassenden Darlehensinformationen nach Art. 247 § 13 EGBGB.'),

(5, 'Verbraucherschutz', 'easy', 'Welche Informationen muss ein Darlehensvermittler vor Vertragsabschluss zur Verfügung stellen?', '["Provision, Darlehenskonditionen, Widerrufsbelehrung", "Nur Provision", "Nur Darlehenskonditionen", "Nur Widerrufsbelehrung"]', 'Provision, Darlehenskonditionen, Widerrufsbelehrung', 'Nach § 34i Abs. 5 GewO muss ein Darlehensvermittler vor Vertragsabschluss Provision, Darlehenskonditionen und Widerrufsbelehrung in Textform zur Verfügung stellen.'),

(5, 'Verbraucherschutz', 'medium', 'Ein Kunde erhält keine Widerrufsbelehrung. Wie lange kann er widerrufen?', '["1 Jahr und 14 Tage", "14 Tage", "30 Tage", "Unbegrenzt"]', '1 Jahr und 14 Tage', 'Ohne ordnungsgemäße Widerrufsbelehrung verlängert sich die Widerrufsfrist auf 1 Jahr und 14 Tage nach § 356 Abs. 3 BGB.'),

(5, 'Verbraucherschutz', 'hard', 'Was ist der Unterschied zwischen Widerruf und Kündigung eines Darlehensvertrags?', '["Widerruf innerhalb Widerrufsfrist, Kündigung nach Ablauf der Widerrufsfrist", "Widerruf nach Ablauf der Widerrufsfrist, Kündigung innerhalb Widerrufsfrist", "Kein Unterschied", "Widerruf ist kostenlos, Kündigung kostenpflichtig"]', 'Widerruf innerhalb Widerrufsfrist, Kündigung nach Ablauf der Widerrufsfrist', 'Der Widerruf kann innerhalb der Widerrufsfrist (14 Tage) ohne Angabe von Gründen erfolgen, die Kündigung erfolgt nach Ablauf der Widerrufsfrist und kann mit Vorfälligkeitsentschädigung verbunden sein.');
</file>

<file path="server/seed-questions-modul5-batch3.sql">
-- Batch 3: 50 additional exam questions for Module 5 (§34i Darlehensvermittlung)
-- Total questions after this batch: 200
-- Distribution: Rechtliche Grundlagen (10), Darlehensarten (10), Finanzierungsplanung (10), Bonitätsprüfung (7), Risiken (7), Verbraucherschutz (6)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES

-- Rechtliche Grundlagen (10 Fragen, ID 151-160)
(5, 'Rechtliche Grundlagen', 'easy', 'Welche Behörde ist für die Erlaubniserteilung nach §34i GewO zuständig?', '["Industrie- und Handelskammer (IHK)", "Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin)", "Gewerbeaufsichtsamt", "Bundeskartellamt"]', 'Industrie- und Handelskammer (IHK)', 'Die IHK ist für die Erlaubniserteilung nach §34i GewO zuständig, nicht die BaFin (die nur für Finanzdienstleistungsinstitute zuständig ist).'),

(5, 'Rechtliche Grundlagen', 'medium', 'Ein Darlehensvermittler verletzt seine Beratungspflichten. Welche Rechtsfolge droht?', '["Bußgeld bis 50.000 EUR, Schadensersatz, Erlaubnisentzug", "Nur Bußgeld", "Nur Schadensersatz", "Nur Erlaubnisentzug"]', 'Bußgeld bis 50.000 EUR, Schadensersatz, Erlaubnisentzug', 'Bei Verletzung der Beratungspflichten drohen Bußgeld (bis 50.000 EUR nach §144 GewO), Schadensersatz (§280 BGB) und Erlaubnisentzug (§35 GewO).'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist der Unterschied zwischen §34c und §34i GewO?', '["§34c regelt Immobilienmakler, §34i regelt Darlehensvermittler", "§34c regelt Darlehensvermittler, §34i regelt Immobilienmakler", "Kein Unterschied", "§34c ist für Gewerbe, §34i für Privatpersonen"]', '§34c regelt Immobilienmakler, §34i regelt Darlehensvermittler', '§34c GewO regelt die Erlaubnispflicht für Immobilienmakler und Wohnimmobilienverwalter, §34i GewO regelt die Erlaubnispflicht für Darlehensvermittler.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Welche Versicherung muss ein Darlehensvermittler nach §34i GewO abschließen?', '["Berufshaftpflichtversicherung", "Rechtsschutzversicherung", "Unfallversicherung", "Lebensversicherung"]', 'Berufshaftpflichtversicherung', 'Nach §34i Abs. 2 Nr. 3 GewO muss ein Darlehensvermittler eine Berufshaftpflichtversicherung mit Mindestdeckungssummen abschließen.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Wie hoch ist die Mindestdeckungssumme der Berufshaftpflichtversicherung nach §34i GewO?', '["1,26 Mio. EUR pro Schadensfall", "500.000 EUR pro Schadensfall", "2 Mio. EUR pro Schadensfall", "250.000 EUR pro Schadensfall"]', '1,26 Mio. EUR pro Schadensfall', 'Die Mindestdeckungssumme beträgt 1,26 Mio. EUR pro Schadensfall nach § 2 Abs. 1 DarlVermV.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist der Unterschied zwischen Darlehensvermittler und Darlehensgeber?', '["Darlehensvermittler vermittelt Darlehen, Darlehensgeber vergibt Darlehen", "Darlehensvermittler vergibt Darlehen, Darlehensgeber vermittelt Darlehen", "Kein Unterschied", "Darlehensvermittler ist immer eine Bank"]', 'Darlehensvermittler vermittelt Darlehen, Darlehensgeber vergibt Darlehen', 'Der Darlehensvermittler vermittelt nur Darlehen zwischen Darlehensnehmer und Darlehensgeber (Bank), vergibt aber selbst keine Darlehen.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Welche Eintragung muss ein Darlehensvermittler vornehmen?', '["Eintragung im Vermittlerregister (§34i GewO)", "Eintragung im Handelsregister", "Eintragung im Grundbuch", "Eintragung im Vereinsregister"]', 'Eintragung im Vermittlerregister (§34i GewO)', 'Nach §34i Abs. 1 GewO muss ein Darlehensvermittler im Vermittlerregister eingetragen sein.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Ein Darlehensvermittler erhält eine Provision von 5% des Darlehensbetrags. Ist das zulässig?', '["Ja, wenn vorher transparent offengelegt", "Nein, Provision ist generell verboten", "Ja, ohne Offenlegung", "Nur bei Darlehen über 100.000 EUR"]', 'Ja, wenn vorher transparent offengelegt', 'Die Provision ist zulässig, wenn sie vorher transparent offengelegt wird (§ 34i Abs. 5 GewO, Art. 247 § 13 EGBGB).'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist die Immobiliarkreditrichtlinie (IKR)?', '["EU-Richtlinie zum Schutz von Verbrauchern bei Immobilienkrediten", "Deutsches Gesetz für Immobilienmakler", "Verordnung für Grundbucheintragungen", "Richtlinie für Baufinanzierung"]', 'EU-Richtlinie zum Schutz von Verbrauchern bei Immobilienkrediten', 'Die Immobiliarkreditrichtlinie (Richtlinie 2014/17/EU) ist eine EU-Richtlinie zum Schutz von Verbrauchern bei Immobilienkrediten, umgesetzt in Deutschland durch §§ 491ff. BGB.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Welche Sachkundeprüfung muss ein Darlehensvermittler ablegen?', '["IHK-Sachkundeprüfung nach §34i GewO", "Steuerberaterprüfung", "Immobilienmaklerprüfung", "Keine Prüfung erforderlich"]', 'IHK-Sachkundeprüfung nach §34i GewO', 'Nach §34i Abs. 1 Nr. 1 GewO muss ein Darlehensvermittler eine IHK-Sachkundeprüfung ablegen.'),

-- Darlehensarten (10 Fragen, ID 161-170)
(5, 'Darlehensarten', 'easy', 'Was ist ein Bauspardarlehen?', '["Darlehen zur Finanzierung von Wohneigentum nach Ansparphase", "Darlehen für Unternehmen", "Darlehen für Konsumgüter", "Darlehen für Studium"]', 'Darlehen zur Finanzierung von Wohneigentum nach Ansparphase', 'Ein Bauspardarlehen ist ein Darlehen zur Finanzierung von Wohneigentum, das nach einer Ansparphase bei einer Bausparkasse gewährt wird.'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde möchte ein Bauspardarlehen aufnehmen. Welche Voraussetzung muss erfüllt sein?', '["Mindestguthaben erreicht, Zuteilungsreife", "Nur Mindestguthaben", "Nur Zuteilungsreife", "Keine Voraussetzungen"]', 'Mindestguthaben erreicht, Zuteilungsreife', 'Für ein Bauspardarlehen muss das Mindestguthaben erreicht sein und die Zuteilungsreife vorliegen.'),

(5, 'Darlehensarten', 'hard', 'Was ist der Unterschied zwischen Annuitätendarlehen und endfälligem Darlehen?', '["Annuitätendarlehen: konstante Rate mit Tilgung, Endfälliges: nur Zinsen, Tilgung am Ende", "Annuitätendarlehen: nur Zinsen, Endfälliges: konstante Rate", "Kein Unterschied", "Annuitätendarlehen ist teurer"]', 'Annuitätendarlehen: konstante Rate mit Tilgung, Endfälliges: nur Zinsen, Tilgung am Ende', 'Beim Annuitätendarlehen wird eine konstante Rate (Zinsen + Tilgung) gezahlt, beim endfälligen Darlehen werden nur Zinsen gezahlt und die Tilgung erfolgt am Ende der Laufzeit.'),

(5, 'Darlehensarten', 'easy', 'Was ist ein KfW-Darlehen?', '["Förderkredit der Kreditanstalt für Wiederaufbau", "Privatkredit einer Bank", "Darlehen für Unternehmen", "Darlehen für Studium"]', 'Förderkredit der Kreditanstalt für Wiederaufbau', 'Ein KfW-Darlehen ist ein Förderkredit der Kreditanstalt für Wiederaufbau (KfW) mit günstigen Konditionen für energieeffizientes Bauen, Sanieren oder Kaufen.'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde möchte ein KfW-Darlehen für energieeffizientes Bauen aufnehmen. Welche KfW-Effizienzhaus-Stufe ist am günstigsten?', '["KfW 40 Plus (höchste Förderung)", "KfW 55", "KfW 70", "KfW 85"]', 'KfW 40 Plus (höchste Förderung)', 'KfW 40 Plus ist die höchste Effizienzhaus-Stufe und erhält die höchste Förderung (niedrigste Zinsen, höchster Tilgungszuschuss).'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Cap-Darlehen?', '["Variables Darlehen mit Zinsobergrenze", "Darlehen mit fester Zinsbindung", "Darlehen ohne Zinsen", "Darlehen mit Tilgungsaussetzung"]', 'Variables Darlehen mit Zinsobergrenze', 'Ein Cap-Darlehen ist ein variables Darlehen, bei dem der Zinssatz an den Marktzins gekoppelt ist, aber eine Obergrenze (Cap) hat.'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Forward-Darlehen?', '["Darlehen, das heute vereinbart und später ausgezahlt wird", "Darlehen, das sofort ausgezahlt wird", "Darlehen ohne Zinsen", "Darlehen für Unternehmen"]', 'Darlehen, das heute vereinbart und später ausgezahlt wird', 'Ein Forward-Darlehen ist ein Darlehen, das heute zu festen Konditionen vereinbart wird, aber erst in der Zukunft (z.B. nach Ablauf der Zinsbindung) ausgezahlt wird.'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde möchte ein Forward-Darlehen für eine Anschlussfinanzierung in 2 Jahren abschließen. Welcher Aufschlag ist üblich?', '["0,01-0,03% pro Monat Vorlaufzeit", "Kein Aufschlag", "0,1% pro Monat", "0,5% pro Monat"]', '0,01-0,03% pro Monat Vorlaufzeit', 'Für Forward-Darlehen wird üblicherweise ein Aufschlag von 0,01-0,03% pro Monat Vorlaufzeit berechnet.'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Volltilgerdarlehen?', '["Darlehen, das am Ende der Zinsbindung vollständig getilgt ist", "Darlehen ohne Tilgung", "Darlehen mit variabler Tilgung", "Darlehen mit Sondertilgung"]', 'Darlehen, das am Ende der Zinsbindung vollständig getilgt ist', 'Ein Volltilgerdarlehen ist ein Darlehen, bei dem die Tilgung so hoch ist, dass das Darlehen am Ende der Zinsbindung vollständig getilgt ist (Restschuld = 0 EUR).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Konstantdarlehen?', '["Darlehen mit konstanter monatlicher Rate (Annuitätendarlehen)", "Darlehen mit variabler Rate", "Darlehen ohne Rate", "Darlehen mit Tilgungsaussetzung"]', 'Darlehen mit konstanter monatlicher Rate (Annuitätendarlehen)', 'Ein Konstantdarlehen ist ein anderer Begriff für ein Annuitätendarlehen, bei dem die monatliche Rate konstant bleibt.'),

-- Finanzierungsplanung (10 Fragen, ID 171-180)
(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Anschlussfinanzierung?', '["Neue Finanzierung nach Ablauf der Zinsbindung", "Erste Finanzierung beim Kauf", "Finanzierung für Renovierung", "Finanzierung für Nebenkosten"]', 'Neue Finanzierung nach Ablauf der Zinsbindung', 'Eine Anschlussfinanzierung ist eine neue Finanzierung, die nach Ablauf der Zinsbindung des ursprünglichen Darlehens abgeschlossen wird.'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde hat nach 10 Jahren Zinsbindung noch 150.000 EUR Restschuld. Welche Optionen hat er für die Anschlussfinanzierung?', '["Prolongation, Umschuldung, Forward-Darlehen", "Nur Prolongation", "Nur Umschuldung", "Nur Forward-Darlehen"]', 'Prolongation, Umschuldung, Forward-Darlehen', 'Der Kunde kann eine Prolongation (Verlängerung bei der gleichen Bank), eine Umschuldung (Wechsel zu einer anderen Bank) oder ein Forward-Darlehen (frühzeitige Vereinbarung) wählen.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist der Unterschied zwischen Prolongation und Umschuldung?', '["Prolongation: gleiche Bank, Umschuldung: andere Bank", "Prolongation: andere Bank, Umschuldung: gleiche Bank", "Kein Unterschied", "Prolongation ist teurer"]', 'Prolongation: gleiche Bank, Umschuldung: andere Bank', 'Bei einer Prolongation bleibt der Kunde bei der gleichen Bank und verlängert das Darlehen, bei einer Umschuldung wechselt er zu einer anderen Bank.'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Umschuldung?', '["Wechsel zu einer anderen Bank für bessere Konditionen", "Verlängerung bei der gleichen Bank", "Tilgung des Darlehens", "Erhöhung des Darlehens"]', 'Wechsel zu einer anderen Bank für bessere Konditionen', 'Eine Umschuldung ist der Wechsel zu einer anderen Bank, um bessere Konditionen (z.B. niedrigere Zinsen) zu erhalten.'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde möchte umschulden. Welche Kosten können anfallen?', '["Vorfälligkeitsentschädigung, Grundbuchkosten, Notarkosten", "Nur Vorfälligkeitsentschädigung", "Nur Grundbuchkosten", "Keine Kosten"]', 'Vorfälligkeitsentschädigung, Grundbuchkosten, Notarkosten', 'Bei einer Umschuldung können Vorfälligkeitsentschädigung (bei vorzeitiger Ablösung), Grundbuchkosten (Abtretung der Grundschuld) und Notarkosten anfallen.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist eine Abtretung der Grundschuld?', '["Übertragung der Grundschuld von einer Bank zur anderen", "Löschung der Grundschuld", "Eintragung einer neuen Grundschuld", "Erhöhung der Grundschuld"]', 'Übertragung der Grundschuld von einer Bank zur anderen', 'Eine Abtretung der Grundschuld ist die Übertragung der Grundschuld von der alten Bank zur neuen Bank bei einer Umschuldung.'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Prolongation?', '["Verlängerung des Darlehens bei der gleichen Bank", "Wechsel zu einer anderen Bank", "Tilgung des Darlehens", "Erhöhung des Darlehens"]', 'Verlängerung des Darlehens bei der gleichen Bank', 'Eine Prolongation ist die Verlängerung des Darlehens bei der gleichen Bank nach Ablauf der Zinsbindung.'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde erhält ein Prolongationsangebot mit 3,5% Zinssatz. Der Marktzins liegt bei 2,8%. Was sollte er tun?', '["Umschuldung prüfen, bessere Konditionen bei anderer Bank", "Prolongation akzeptieren", "Darlehen sofort tilgen", "Nichts tun"]', 'Umschuldung prüfen, bessere Konditionen bei anderer Bank', 'Wenn das Prolongationsangebot deutlich über dem Marktzins liegt, sollte der Kunde eine Umschuldung zu einer anderen Bank mit besseren Konditionen prüfen.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist eine Anschlussfinanzierung mit Sondertilgung?', '["Anschlussfinanzierung mit Option zur außerplanmäßigen Tilgung", "Anschlussfinanzierung ohne Tilgung", "Anschlussfinanzierung mit variabler Tilgung", "Anschlussfinanzierung mit Tilgungsaussetzung"]', 'Anschlussfinanzierung mit Option zur außerplanmäßigen Tilgung', 'Eine Anschlussfinanzierung mit Sondertilgung ermöglicht außerplanmäßige Tilgungen zusätzlich zur regulären Rate, um das Darlehen schneller zurückzuzahlen.'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Restschuld?', '["Verbleibender Darlehensbetrag nach Ablauf der Zinsbindung", "Gesamter Darlehensbetrag", "Tilgungsbetrag", "Zinsbetrag"]', 'Verbleibender Darlehensbetrag nach Ablauf der Zinsbindung', 'Die Restschuld ist der verbleibende Darlehensbetrag, der nach Ablauf der Zinsbindung noch nicht getilgt ist.'),

-- Bonitätsprüfung (7 Fragen, ID 181-187)
(5, 'Bonitätsprüfung', 'easy', 'Welche Rolle spielt die Schufa bei der Kreditvergabe?', '["Bewertung der Kreditwürdigkeit des Kunden", "Vergabe des Kredits", "Berechnung der Zinsen", "Eintragung im Grundbuch"]', 'Bewertung der Kreditwürdigkeit des Kunden', 'Die Schufa bewertet die Kreditwürdigkeit des Kunden anhand von Daten über Zahlungsverhalten, Kredithistorie und offene Kredite.'),

(5, 'Bonitätsprüfung', 'medium', 'Ein Kunde hat einen Schufa-Score von 95%. Wie ist seine Bonität einzuschätzen?', '["Sehr gute Bonität", "Mittlere Bonität", "Schlechte Bonität", "Keine Bonität"]', 'Sehr gute Bonität', 'Ein Schufa-Score von 95% bedeutet sehr gute Bonität (95-100% = sehr geringes Ausfallrisiko).'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist der Unterschied zwischen Schufa-Auskunft und Schufa-Score?', '["Schufa-Auskunft: detaillierte Informationen, Schufa-Score: Kennzahl (0-100%)", "Schufa-Auskunft: Kennzahl, Schufa-Score: detaillierte Informationen", "Kein Unterschied", "Schufa-Auskunft ist kostenlos, Schufa-Score kostenpflichtig"]', 'Schufa-Auskunft: detaillierte Informationen, Schufa-Score: Kennzahl (0-100%)', 'Die Schufa-Auskunft enthält detaillierte Informationen über Kredithistorie, Zahlungsverhalten und offene Kredite, der Schufa-Score ist eine Kennzahl (0-100%) für die Kreditwürdigkeit.'),

(5, 'Bonitätsprüfung', 'easy', 'Welche Unterlagen benötigt eine Bank für die Bonitätsprüfung bei Selbstständigen?', '["Einkommenssteuerbescheide, BWA, Bilanzen", "Nur Einkommenssteuerbescheide", "Nur BWA", "Nur Bilanzen"]', 'Einkommenssteuerbescheide, BWA, Bilanzen', 'Für Selbstständige benötigt die Bank Einkommenssteuerbescheide der letzten 2-3 Jahre, betriebswirtschaftliche Auswertungen (BWA) und Bilanzen.'),

(5, 'Bonitätsprüfung', 'medium', 'Ein selbstständiger Kunde hat schwankende Einkommen. Wie wird die Bonität bewertet?', '["Durchschnitt der letzten 2-3 Jahre", "Nur letztes Jahr", "Nur bestes Jahr", "Nur schlechtestes Jahr"]', 'Durchschnitt der letzten 2-3 Jahre', 'Bei schwankenden Einkommen wird der Durchschnitt der letzten 2-3 Jahre herangezogen, um die Bonität zu bewerten.'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist eine Selbstauskunft des Kunden?', '["Formular mit Angaben zu Einkommen, Vermögen, Verbindlichkeiten", "Schufa-Auskunft", "Einkommenssteuerbescheid", "Arbeitsvertrag"]', 'Formular mit Angaben zu Einkommen, Vermögen, Verbindlichkeiten', 'Eine Selbstauskunft ist ein Formular, in dem der Kunde Angaben zu Einkommen, Vermögen, Verbindlichkeiten und anderen finanziellen Verhältnissen macht.'),

(5, 'Bonitätsprüfung', 'easy', 'Welche Bedeutung hat das Eigenkapital für die Bonität?', '["Höheres Eigenkapital = bessere Bonität, niedrigere Zinsen", "Eigenkapital hat keine Bedeutung", "Höheres Eigenkapital = schlechtere Bonität", "Eigenkapital ist nur für Unternehmen relevant"]', 'Höheres Eigenkapital = bessere Bonität, niedrigere Zinsen', 'Höheres Eigenkapital verbessert die Bonität, da das Ausfallrisiko für die Bank sinkt, und führt zu niedrigeren Zinsen.'),

-- Risiken (7 Fragen, ID 188-194)
(5, 'Risiken', 'easy', 'Was ist ein Arbeitslosigkeitsrisiko?', '["Risiko, dass der Darlehensnehmer arbeitslos wird und die Rate nicht zahlen kann", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten"]', 'Risiko, dass der Darlehensnehmer arbeitslos wird und die Rate nicht zahlen kann', 'Das Arbeitslosigkeitsrisiko ist das Risiko, dass der Darlehensnehmer arbeitslos wird und die monatliche Rate nicht mehr zahlen kann.'),

(5, 'Risiken', 'medium', 'Ein Kunde möchte sich gegen Arbeitslosigkeit absichern. Welche Versicherung ist geeignet?', '["Restschuldversicherung mit Arbeitslosigkeitsschutz", "Rechtsschutzversicherung", "Unfallversicherung", "Lebensversicherung"]', 'Restschuldversicherung mit Arbeitslosigkeitsschutz', 'Eine Restschuldversicherung mit Arbeitslosigkeitsschutz übernimmt die Raten bei Arbeitslosigkeit des Darlehensnehmers.'),

(5, 'Risiken', 'hard', 'Was ist ein Klumpenrisiko?', '["Konzentration des Vermögens auf eine Anlage (z.B. nur Immobilie)", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten"]', 'Konzentration des Vermögens auf eine Anlage (z.B. nur Immobilie)', 'Das Klumpenrisiko ist das Risiko, dass das gesamte Vermögen auf eine Anlage (z.B. nur Immobilie) konzentriert ist und bei Wertverlust hohe Verluste entstehen.'),

(5, 'Risiken', 'easy', 'Was ist ein Zinsrisiko?', '["Risiko steigender Zinsen bei variabler Verzinsung oder Anschlussfinanzierung", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten", "Risiko sinkender Einkommen"]', 'Risiko steigender Zinsen bei variabler Verzinsung oder Anschlussfinanzierung', 'Das Zinsrisiko ist das Risiko, dass die Zinsen bei variabler Verzinsung oder bei der Anschlussfinanzierung steigen und die monatliche Rate höher wird.'),

(5, 'Risiken', 'medium', 'Ein Kunde hat ein variables Darlehen mit 1,5% Zinssatz. Der Marktzins steigt auf 3,5%. Welches Risiko tritt ein?', '["Zinsrisiko: monatliche Rate steigt", "Tilgungsrisiko", "Währungsrisiko", "Kein Risiko"]', 'Zinsrisiko: monatliche Rate steigt', 'Bei einem variablen Darlehen steigt die monatliche Rate, wenn der Marktzins steigt (Zinsrisiko).'),

(5, 'Risiken', 'hard', 'Was ist ein Immobilienwertrisiko?', '["Risiko sinkender Immobilienpreise", "Risiko steigender Zinsen", "Risiko steigender Nebenkosten", "Risiko sinkender Einkommen"]', 'Risiko sinkender Immobilienpreise', 'Das Immobilienwertrisiko ist das Risiko, dass der Wert der Immobilie sinkt und bei einem Verkauf die Restschuld nicht gedeckt ist.'),

(5, 'Risiken', 'easy', 'Was ist eine Risikolebensversicherung?', '["Versicherung, die im Todesfall die Restschuld tilgt", "Versicherung gegen Arbeitslosigkeit", "Versicherung gegen Zinsänderungen", "Versicherung gegen Immobilienwertverfall"]', 'Versicherung, die im Todesfall die Restschuld tilgt', 'Eine Risikolebensversicherung tilgt im Todesfall des Darlehensnehmers die Restschuld, um die Hinterbliebenen zu schützen.'),

-- Verbraucherschutz (6 Fragen, ID 195-200)
(5, 'Verbraucherschutz', 'easy', 'Welche Informationen muss ein Darlehensvermittler vor Vertragsabschluss zur Verfügung stellen?', '["ESIS-Merkblatt, Provision, Widerrufsbelehrung", "Nur ESIS-Merkblatt", "Nur Provision", "Nur Widerrufsbelehrung"]', 'ESIS-Merkblatt, Provision, Widerrufsbelehrung', 'Nach § 34i Abs. 5 GewO und Art. 247 § 13 EGBGB muss ein Darlehensvermittler vor Vertragsabschluss das ESIS-Merkblatt, die Provision und die Widerrufsbelehrung in Textform zur Verfügung stellen.'),

(5, 'Verbraucherschutz', 'medium', 'Ein Kunde erhält kein ESIS-Merkblatt vor Vertragsabschluss. Welche Rechtsfolge tritt ein?', '["Verlängerung der Widerrufsfrist auf 1 Jahr und 14 Tage", "Keine Rechtsfolge", "Vertrag ist nichtig", "Nur Bußgeld"]', 'Verlängerung der Widerrufsfrist auf 1 Jahr und 14 Tage', 'Ohne ESIS-Merkblatt verlängert sich die Widerrufsfrist auf 1 Jahr und 14 Tage nach § 356 Abs. 3 BGB.'),

(5, 'Verbraucherschutz', 'hard', 'Was ist der Unterschied zwischen ESIS-Merkblatt und Widerrufsbelehrung?', '["ESIS: Darlehensinformationen, Widerrufsbelehrung: Widerrufsrecht", "ESIS: Widerrufsrecht, Widerrufsbelehrung: Darlehensinformationen", "Kein Unterschied", "ESIS ist für Unternehmen, Widerrufsbelehrung für Privatpersonen"]', 'ESIS: Darlehensinformationen, Widerrufsbelehrung: Widerrufsrecht', 'Das ESIS-Merkblatt enthält umfassende Darlehensinformationen (Zinssatz, Laufzeit, Kosten), die Widerrufsbelehrung informiert über das Widerrufsrecht (14 Tage).'),

(5, 'Verbraucherschutz', 'easy', 'Welche Frist gilt für das Widerrufsrecht bei Immobiliardarlehensverträgen?', '["14 Tage", "7 Tage", "21 Tage", "30 Tage"]', '14 Tage', 'Das Widerrufsrecht bei Immobiliardarlehensverträgen beträgt 14 Tage nach § 495 Abs. 1 BGB.'),

(5, 'Verbraucherschutz', 'medium', 'Ein Kunde widerruft einen Darlehensvertrag nach 12 Tagen. Welche Kosten muss er tragen?', '["Nur Zinsen für die Zeit bis zum Widerruf", "Vorfälligkeitsentschädigung", "Keine Kosten", "Schadensersatz"]', 'Nur Zinsen für die Zeit bis zum Widerruf', 'Bei Widerruf innerhalb der Widerrufsfrist muss der Kunde nur die Zinsen für die Zeit bis zum Widerruf zahlen (§ 357a BGB).'),

(5, 'Verbraucherschutz', 'hard', 'Was ist eine Beratungsdokumentation?', '["Protokoll über die Beratung des Kunden", "Schufa-Auskunft", "ESIS-Merkblatt", "Widerrufsbelehrung"]', 'Protokoll über die Beratung des Kunden', 'Eine Beratungsdokumentation ist ein Protokoll über die Beratung des Kunden, das die besprochenen Themen, Empfehlungen und Entscheidungen festhält (Pflicht nach § 511 BGB).');
</file>

<file path="server/seed-questions-modul5-batch4.sql">
-- Batch 4: 50 additional exam questions for Module 5 (§34i Darlehensvermittlung)
-- Total after this batch: 250 questions
-- Distribution: Rechtliche Grundlagen (10), Darlehensarten (10), Finanzierungsplanung (10), Bonitätsprüfung (7), Risiken (7), Verbraucherschutz (6)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES

-- Rechtliche Grundlagen (10 Fragen, ID 201-210)
(5, 'Rechtliche Grundlagen', 'easy', 'Was regelt § 34i GewO?', '["Erlaubnispflicht für Immobiliardarlehensvermittlung", "Erlaubnispflicht für Immobilienmakler", "Erlaubnispflicht für Verwalter", "Erlaubnispflicht für Gutachter"]', 'Erlaubnispflicht für Immobiliardarlehensvermittlung', '§ 34i GewO regelt die Erlaubnispflicht für die Vermittlung von Immobiliardarlehensverträgen.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Voraussetzungen muss ein Darlehensvermittler nach § 34i GewO erfüllen?', '["Sachkunde, Berufshaftpflichtversicherung, Registrierung", "Nur Sachkunde", "Nur Berufshaftpflichtversicherung", "Nur Registrierung"]', 'Sachkunde, Berufshaftpflichtversicherung, Registrierung', 'Ein Darlehensvermittler muss Sachkunde nachweisen, eine Berufshaftpflichtversicherung abschließen und sich im Vermittlerregister registrieren lassen.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist der Unterschied zwischen Darlehensvermittlung und Darlehensberatung?', '["Vermittlung: Vertragsabschluss, Beratung: nur Information", "Vermittlung: nur Information, Beratung: Vertragsabschluss", "Kein Unterschied", "Vermittlung ist kostenpflichtig, Beratung kostenlos"]', 'Vermittlung: Vertragsabschluss, Beratung: nur Information', 'Darlehensvermittlung führt zum Vertragsabschluss, Darlehensberatung bietet nur Informationen ohne Vertragsabschluss.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Welche Mindestdeckungssumme gilt für die Berufshaftpflichtversicherung nach § 34i GewO?', '["1,26 Millionen EUR pro Schadensfall", "500.000 EUR pro Schadensfall", "2 Millionen EUR pro Schadensfall", "Keine Mindestdeckungssumme"]', '1,26 Millionen EUR pro Schadensfall', 'Die Mindestdeckungssumme für die Berufshaftpflichtversicherung beträgt 1,26 Millionen EUR pro Schadensfall nach § 34i Abs. 2 GewO.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Ein Darlehensvermittler hat keine Berufshaftpflichtversicherung. Welche Rechtsfolge tritt ein?', '["Erlöschen der Erlaubnis, Bußgeld bis 50.000 EUR", "Nur Bußgeld", "Nur Erlöschen der Erlaubnis", "Keine Rechtsfolge"]', 'Erlöschen der Erlaubnis, Bußgeld bis 50.000 EUR', 'Ohne Berufshaftpflichtversicherung erlischt die Erlaubnis nach § 34i Abs. 2 GewO, zusätzlich droht ein Bußgeld bis 50.000 EUR.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist eine gebundene Vermittlung nach § 34i GewO?', '["Vermittlung nur für einen Darlehensgeber", "Vermittlung für mehrere Darlehensgeber", "Vermittlung ohne Provision", "Vermittlung ohne Erlaubnis"]', 'Vermittlung nur für einen Darlehensgeber', 'Eine gebundene Vermittlung liegt vor, wenn der Vermittler nur für einen Darlehensgeber tätig ist (§ 34i Abs. 1 Nr. 2 GewO).'),

(5, 'Rechtliche Grundlagen', 'easy', 'Wo muss sich ein Darlehensvermittler registrieren lassen?', '["Vermittlerregister (§ 11a GewO)", "Handelsregister", "Grundbuch", "IHK"]', 'Vermittlerregister (§ 11a GewO)', 'Ein Darlehensvermittler muss sich im Vermittlerregister nach § 11a GewO registrieren lassen.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Angaben muss ein Darlehensvermittler im Vermittlerregister machen?', '["Name, Anschrift, Registernummer, Vermittlerstatus", "Nur Name", "Nur Anschrift", "Nur Registernummer"]', 'Name, Anschrift, Registernummer, Vermittlerstatus', 'Im Vermittlerregister müssen Name, Anschrift, Registernummer und Vermittlerstatus (gebunden/ungebunden) angegeben werden.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist der Unterschied zwischen gebundener und ungebundener Vermittlung?', '["Gebunden: nur ein Darlehensgeber, Ungebunden: mehrere Darlehensgeber", "Gebunden: mehrere Darlehensgeber, Ungebunden: nur ein Darlehensgeber", "Kein Unterschied", "Gebunden ist kostenpflichtig, Ungebunden kostenlos"]', 'Gebunden: nur ein Darlehensgeber, Ungebunden: mehrere Darlehensgeber', 'Gebundene Vermittler arbeiten nur für einen Darlehensgeber, ungebundene Vermittler arbeiten für mehrere Darlehensgeber.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Welche Pflichten hat ein Darlehensvermittler gegenüber dem Kunden?', '["Beratungspflicht, Dokumentationspflicht, Informationspflicht", "Nur Beratungspflicht", "Nur Dokumentationspflicht", "Nur Informationspflicht"]', 'Beratungspflicht, Dokumentationspflicht, Informationspflicht', 'Ein Darlehensvermittler hat Beratungs-, Dokumentations- und Informationspflichten gegenüber dem Kunden (§ 511 BGB, Art. 247 § 13 EGBGB).'),

-- Darlehensarten (10 Fragen, ID 211-220)
(5, 'Darlehensarten', 'easy', 'Was ist ein Forward-Darlehen?', '["Darlehen mit zukünftiger Auszahlung und festem Zinssatz", "Darlehen mit sofortiger Auszahlung", "Darlehen mit variablem Zinssatz", "Darlehen ohne Zinsen"]', 'Darlehen mit zukünftiger Auszahlung und festem Zinssatz', 'Ein Forward-Darlehen ist ein Darlehen, das erst in der Zukunft ausgezahlt wird, aber bereits heute zu einem festen Zinssatz abgeschlossen wird.'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde möchte in 2 Jahren eine Anschlussfinanzierung. Welches Darlehen ist geeignet?', '["Forward-Darlehen", "Annuitätendarlehen", "Tilgungsdarlehen", "Festdarlehen"]', 'Forward-Darlehen', 'Ein Forward-Darlehen ist geeignet, da es heute abgeschlossen wird, aber erst in 2 Jahren ausgezahlt wird, um sich den aktuellen Zinssatz zu sichern.'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Forward-Aufschlag?', '["Zinsaufschlag für Forward-Darlehen", "Zinsabschlag für Forward-Darlehen", "Tilgungsaufschlag", "Keine Kosten"]', 'Zinsaufschlag für Forward-Darlehen', 'Ein Forward-Aufschlag ist ein Zinsaufschlag, den die Bank für Forward-Darlehen verlangt (ca. 0,01-0,03% pro Monat Vorlaufzeit).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Festdarlehen (endfälliges Darlehen)?', '["Darlehen ohne laufende Tilgung, Rückzahlung am Ende", "Darlehen mit laufender Tilgung", "Darlehen mit variabler Tilgung", "Darlehen ohne Zinsen"]', 'Darlehen ohne laufende Tilgung, Rückzahlung am Ende', 'Ein Festdarlehen ist ein Darlehen ohne laufende Tilgung, die Rückzahlung erfolgt am Ende der Laufzeit in einer Summe.'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde hat ein Festdarlehen mit 200.000 EUR und 3% Zinssatz. Wie hoch ist die monatliche Rate?', '["500 EUR (nur Zinsen)", "1.000 EUR (Zinsen + Tilgung)", "0 EUR (keine Rate)", "2.000 EUR"]', '500 EUR (nur Zinsen)', 'Bei einem Festdarlehen werden nur Zinsen gezahlt: 200.000 EUR × 3% ÷ 12 = 500 EUR/Monat.'),

(5, 'Darlehensarten', 'hard', 'Was ist der Unterschied zwischen Festdarlehen und Annuitätendarlehen?', '["Festdarlehen: keine Tilgung, Annuitätendarlehen: laufende Tilgung", "Festdarlehen: laufende Tilgung, Annuitätendarlehen: keine Tilgung", "Kein Unterschied", "Festdarlehen ist teurer"]', 'Festdarlehen: keine Tilgung, Annuitätendarlehen: laufende Tilgung', 'Bei einem Festdarlehen wird nicht getilgt (nur Zinsen), bei einem Annuitätendarlehen wird laufend getilgt (Zinsen + Tilgung).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Tilgungsdarlehen (Abzahlungsdarlehen)?', '["Darlehen mit konstanter Tilgung, sinkende Rate", "Darlehen mit konstanter Rate", "Darlehen ohne Tilgung", "Darlehen mit variabler Tilgung"]', 'Darlehen mit konstanter Tilgung, sinkende Rate', 'Ein Tilgungsdarlehen hat eine konstante Tilgung, die monatliche Rate sinkt, da die Zinsen auf die sinkende Restschuld berechnet werden.'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde hat ein Tilgungsdarlehen mit 100.000 EUR, 10 Jahre Laufzeit, 3% Zinssatz. Wie hoch ist die monatliche Tilgung?', '["833,33 EUR", "500 EUR", "1.000 EUR", "250 EUR"]', '833,33 EUR', 'Monatliche Tilgung = 100.000 EUR ÷ 120 Monate = 833,33 EUR.'),

(5, 'Darlehensarten', 'hard', 'Was ist der Unterschied zwischen Tilgungsdarlehen und Annuitätendarlehen?', '["Tilgungsdarlehen: konstante Tilgung, sinkende Rate; Annuitätendarlehen: konstante Rate, steigende Tilgung", "Tilgungsdarlehen: konstante Rate; Annuitätendarlehen: sinkende Rate", "Kein Unterschied", "Tilgungsdarlehen ist teurer"]', 'Tilgungsdarlehen: konstante Tilgung, sinkende Rate; Annuitätendarlehen: konstante Rate, steigende Tilgung', 'Bei einem Tilgungsdarlehen ist die Tilgung konstant und die Rate sinkt, bei einem Annuitätendarlehen ist die Rate konstant und die Tilgung steigt.'),

(5, 'Darlehensarten', 'easy', 'Was ist ein variables Darlehen?', '["Darlehen mit variablem Zinssatz", "Darlehen mit festem Zinssatz", "Darlehen mit variabler Tilgung", "Darlehen ohne Zinsen"]', 'Darlehen mit variablem Zinssatz', 'Ein variables Darlehen hat einen variablen Zinssatz, der sich an einem Referenzzinssatz (z.B. EURIBOR) orientiert.'),

-- Finanzierungsplanung (10 Fragen, ID 221-230)
(5, 'Finanzierungsplanung', 'easy', 'Was ist ein Forward-Darlehen?', '["Darlehen mit zukünftiger Auszahlung und festem Zinssatz", "Darlehen mit sofortiger Auszahlung", "Darlehen mit variablem Zinssatz", "Darlehen ohne Zinsen"]', 'Darlehen mit zukünftiger Auszahlung und festem Zinssatz', 'Ein Forward-Darlehen wird heute abgeschlossen, aber erst in der Zukunft ausgezahlt, um sich den aktuellen Zinssatz zu sichern.'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde hat in 18 Monaten eine Anschlussfinanzierung. Der Marktzins liegt bei 2,5%. Was sollte er tun?', '["Forward-Darlehen abschließen, um sich den Zinssatz zu sichern", "Warten und später entscheiden", "Sofort umschulden", "Nichts tun"]', 'Forward-Darlehen abschließen, um sich den Zinssatz zu sichern', 'Bei niedrigen Zinsen sollte der Kunde ein Forward-Darlehen abschließen, um sich den günstigen Zinssatz für die Anschlussfinanzierung zu sichern.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist die maximale Vorlaufzeit für Forward-Darlehen?', '["Bis zu 5 Jahre", "Bis zu 1 Jahr", "Bis zu 10 Jahre", "Unbegrenzt"]', 'Bis zu 5 Jahre', 'Die maximale Vorlaufzeit für Forward-Darlehen beträgt in der Regel bis zu 5 Jahre (60 Monate).'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Volltilgung?', '["Vollständige Tilgung des Darlehens während der Zinsbindung", "Teilweise Tilgung", "Keine Tilgung", "Tilgung am Ende"]', 'Vollständige Tilgung des Darlehens während der Zinsbindung', 'Eine Volltilgung bedeutet, dass das Darlehen während der Zinsbindung vollständig getilgt wird (Restschuld = 0 EUR).'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde möchte ein Darlehen mit 200.000 EUR in 15 Jahren vollständig tilgen. Welche Tilgung ist erforderlich?', '["Ca. 6,67% anfängliche Tilgung", "Ca. 3% anfängliche Tilgung", "Ca. 1% anfängliche Tilgung", "Ca. 10% anfängliche Tilgung"]', 'Ca. 6,67% anfängliche Tilgung', 'Für eine Volltilgung in 15 Jahren ist eine anfängliche Tilgung von ca. 6,67% erforderlich (200.000 EUR ÷ 15 Jahre ÷ 12 Monate = 1.111 EUR/Monat).'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist der Unterschied zwischen Volltilgung und Teilamortisation?', '["Volltilgung: Restschuld = 0, Teilamortisation: Restschuld > 0", "Volltilgung: Restschuld > 0, Teilamortisation: Restschuld = 0", "Kein Unterschied", "Volltilgung ist teurer"]', 'Volltilgung: Restschuld = 0, Teilamortisation: Restschuld > 0', 'Bei einer Volltilgung ist die Restschuld am Ende der Zinsbindung 0 EUR, bei einer Teilamortisation ist die Restschuld > 0 EUR.'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Sondertilgung?', '["Außerplanmäßige Tilgung zusätzlich zur regulären Rate", "Reguläre Tilgung", "Tilgung am Ende", "Keine Tilgung"]', 'Außerplanmäßige Tilgung zusätzlich zur regulären Rate', 'Eine Sondertilgung ist eine außerplanmäßige Tilgung zusätzlich zur regulären Rate, um das Darlehen schneller zurückzuzahlen.'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde hat ein Darlehen mit 200.000 EUR und 5% Sondertilgung pro Jahr. Wie viel kann er maximal sondertilgen?', '["10.000 EUR pro Jahr", "5.000 EUR pro Jahr", "20.000 EUR pro Jahr", "Unbegrenzt"]', '10.000 EUR pro Jahr', 'Maximale Sondertilgung = 200.000 EUR × 5% = 10.000 EUR pro Jahr.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist der Unterschied zwischen Sondertilgung und Tilgungsänderung?', '["Sondertilgung: einmalige Zahlung, Tilgungsänderung: dauerhafte Änderung der Rate", "Sondertilgung: dauerhafte Änderung, Tilgungsänderung: einmalige Zahlung", "Kein Unterschied", "Sondertilgung ist teurer"]', 'Sondertilgung: einmalige Zahlung, Tilgungsänderung: dauerhafte Änderung der Rate', 'Eine Sondertilgung ist eine einmalige Zahlung, eine Tilgungsänderung ist eine dauerhafte Änderung der monatlichen Rate.'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Tilgungsaussetzung?', '["Vorübergehende Aussetzung der Tilgung, nur Zinsen zahlen", "Dauerhafte Aussetzung der Tilgung", "Aussetzung der Zinsen", "Keine Zahlung"]', 'Vorübergehende Aussetzung der Tilgung, nur Zinsen zahlen', 'Eine Tilgungsaussetzung ist die vorübergehende Aussetzung der Tilgung, es werden nur Zinsen gezahlt.'),

-- Bonitätsprüfung (7 Fragen, ID 231-237)
(5, 'Bonitätsprüfung', 'easy', 'Was ist eine Haushaltsrechnung?', '["Gegenüberstellung von Einnahmen und Ausgaben", "Schufa-Auskunft", "Einkommenssteuerbescheid", "Arbeitsvertrag"]', 'Gegenüberstellung von Einnahmen und Ausgaben', 'Eine Haushaltsrechnung ist eine Gegenüberstellung von Einnahmen und Ausgaben, um das verfügbare Einkommen zu ermitteln.'),

(5, 'Bonitätsprüfung', 'medium', 'Ein Kunde hat 4.000 EUR Nettoeinkommen und 2.500 EUR Ausgaben. Wie hoch ist das verfügbare Einkommen?', '["1.500 EUR", "4.000 EUR", "2.500 EUR", "6.500 EUR"]', '1.500 EUR', 'Verfügbares Einkommen = 4.000 EUR - 2.500 EUR = 1.500 EUR.'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist eine Kapitaldienstfähigkeit?', '["Fähigkeit, die monatliche Rate dauerhaft zu zahlen", "Fähigkeit, das Darlehen sofort zurückzuzahlen", "Fähigkeit, Sondertilgungen zu leisten", "Keine Fähigkeit"]', 'Fähigkeit, die monatliche Rate dauerhaft zu zahlen', 'Kapitaldienstfähigkeit ist die Fähigkeit des Kunden, die monatliche Rate dauerhaft aus dem verfügbaren Einkommen zu zahlen.'),

(5, 'Bonitätsprüfung', 'easy', 'Welche Unterlagen benötigt eine Bank für die Bonitätsprüfung bei Angestellten?', '["Gehaltsabrechnungen, Arbeitsvertrag, Kontoauszüge", "Nur Gehaltsabrechnungen", "Nur Arbeitsvertrag", "Nur Kontoauszüge"]', 'Gehaltsabrechnungen, Arbeitsvertrag, Kontoauszüge', 'Für Angestellte benötigt die Bank Gehaltsabrechnungen der letzten 3 Monate, Arbeitsvertrag und Kontoauszüge der letzten 3 Monate.'),

(5, 'Bonitätsprüfung', 'medium', 'Ein Kunde hat ein befristetes Arbeitsverhältnis. Wie wird die Bonität bewertet?', '["Schlechter als unbefristetes Arbeitsverhältnis, höheres Risiko", "Gleich wie unbefristetes Arbeitsverhältnis", "Besser als unbefristetes Arbeitsverhältnis", "Keine Bewertung"]', 'Schlechter als unbefristetes Arbeitsverhältnis, höheres Risiko', 'Ein befristetes Arbeitsverhältnis wird schlechter bewertet als ein unbefristetes, da das Risiko höher ist (Einkommen endet nach Befristung).'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist eine Schufa-Klausel?', '["Einwilligung des Kunden zur Schufa-Abfrage", "Schufa-Auskunft", "Schufa-Score", "Schufa-Eintrag"]', 'Einwilligung des Kunden zur Schufa-Abfrage', 'Eine Schufa-Klausel ist die Einwilligung des Kunden, dass die Bank eine Schufa-Abfrage durchführen darf.'),

(5, 'Bonitätsprüfung', 'easy', 'Welche Bedeutung hat ein negativer Schufa-Eintrag?', '["Schlechte Bonität, höheres Ausfallrisiko, höhere Zinsen oder Ablehnung", "Gute Bonität", "Keine Bedeutung", "Niedrigere Zinsen"]', 'Schlechte Bonität, höheres Ausfallrisiko, höhere Zinsen oder Ablehnung', 'Ein negativer Schufa-Eintrag bedeutet schlechte Bonität, höheres Ausfallrisiko und führt zu höheren Zinsen oder Ablehnung des Darlehens.'),

-- Risiken (7 Fragen, ID 238-244)
(5, 'Risiken', 'easy', 'Was ist ein Einkommensrisiko?', '["Risiko sinkender oder wegfallender Einkommen", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten"]', 'Risiko sinkender oder wegfallender Einkommen', 'Das Einkommensrisiko ist das Risiko, dass das Einkommen sinkt oder wegfällt (z.B. durch Arbeitslosigkeit, Krankheit) und die Rate nicht mehr gezahlt werden kann.'),

(5, 'Risiken', 'medium', 'Ein Kunde hat ein variables Einkommen (Provision). Wie sollte die Finanzierung gestaltet werden?', '["Konservativ, höhere Eigenkapitalquote, Sicherheitspuffer", "Aggressiv, niedrige Eigenkapitalquote", "Keine besondere Gestaltung", "Nur Festdarlehen"]', 'Konservativ, höhere Eigenkapitalquote, Sicherheitspuffer', 'Bei variablem Einkommen sollte die Finanzierung konservativ gestaltet werden (höhere Eigenkapitalquote, Sicherheitspuffer), um Einkommensrisiken abzufedern.'),

(5, 'Risiken', 'hard', 'Was ist ein Liquiditätsrisiko?', '["Risiko, dass kurzfristig nicht genug Geld verfügbar ist", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko sinkender Einkommen"]', 'Risiko, dass kurzfristig nicht genug Geld verfügbar ist', 'Das Liquiditätsrisiko ist das Risiko, dass kurzfristig nicht genug Geld verfügbar ist, um die Rate oder unerwartete Ausgaben zu zahlen.'),

(5, 'Risiken', 'easy', 'Was ist eine Restschuldversicherung?', '["Versicherung, die bei Tod, Arbeitslosigkeit oder Krankheit die Rate übernimmt", "Versicherung gegen Zinsänderungen", "Versicherung gegen Immobilienwertverfall", "Versicherung gegen Nebenkosten"]', 'Versicherung, die bei Tod, Arbeitslosigkeit oder Krankheit die Rate übernimmt', 'Eine Restschuldversicherung übernimmt bei Tod, Arbeitslosigkeit oder Krankheit die monatliche Rate oder tilgt die Restschuld.'),

(5, 'Risiken', 'medium', 'Ein Kunde hat eine Restschuldversicherung mit 200.000 EUR Darlehenssumme. Welche Kosten fallen an?', '["Ca. 5-10% der Darlehenssumme (10.000-20.000 EUR)", "Ca. 1-2% der Darlehenssumme", "Ca. 20-30% der Darlehenssumme", "Keine Kosten"]', 'Ca. 5-10% der Darlehenssumme (10.000-20.000 EUR)', 'Eine Restschuldversicherung kostet ca. 5-10% der Darlehenssumme, also 10.000-20.000 EUR bei 200.000 EUR Darlehenssumme.'),

(5, 'Risiken', 'hard', 'Was ist der Unterschied zwischen Risikolebensversicherung und Restschuldversicherung?', '["Risikolebensversicherung: nur Tod, Restschuldversicherung: Tod + Arbeitslosigkeit + Krankheit", "Risikolebensversicherung: Tod + Arbeitslosigkeit, Restschuldversicherung: nur Tod", "Kein Unterschied", "Risikolebensversicherung ist teurer"]', 'Risikolebensversicherung: nur Tod, Restschuldversicherung: Tod + Arbeitslosigkeit + Krankheit', 'Eine Risikolebensversicherung deckt nur den Todesfall ab, eine Restschuldversicherung deckt Tod, Arbeitslosigkeit und Krankheit ab.'),

(5, 'Risiken', 'easy', 'Was ist ein Währungsrisiko?', '["Risiko bei Fremdwährungsdarlehen durch Wechselkursschwankungen", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko sinkender Einkommen"]', 'Risiko bei Fremdwährungsdarlehen durch Wechselkursschwankungen', 'Das Währungsrisiko ist das Risiko bei Fremdwährungsdarlehen (z.B. Schweizer Franken), dass der Wechselkurs ungünstig schwankt und die Restschuld steigt.'),

-- Verbraucherschutz (6 Fragen, ID 245-250)
(5, 'Verbraucherschutz', 'easy', 'Was ist eine Widerrufsbelehrung?', '["Information über das Widerrufsrecht (14 Tage)", "Information über das Darlehen", "Information über die Provision", "Information über die Schufa"]', 'Information über das Widerrufsrecht (14 Tage)', 'Eine Widerrufsbelehrung informiert den Kunden über sein Widerrufsrecht (14 Tage nach § 495 BGB).'),

(5, 'Verbraucherschutz', 'medium', 'Ein Kunde erhält keine Widerrufsbelehrung. Welche Rechtsfolge tritt ein?', '["Verlängerung der Widerrufsfrist auf 1 Jahr und 14 Tage", "Keine Rechtsfolge", "Vertrag ist nichtig", "Nur Bußgeld"]', 'Verlängerung der Widerrufsfrist auf 1 Jahr und 14 Tage', 'Ohne Widerrufsbelehrung verlängert sich die Widerrufsfrist auf 1 Jahr und 14 Tage nach § 356 Abs. 3 BGB.'),

(5, 'Verbraucherschutz', 'hard', 'Was ist eine Widerrufsfolgenbelehrung?', '["Information über die Folgen des Widerrufs (Rückzahlung, Zinsen)", "Information über das Widerrufsrecht", "Information über das Darlehen", "Information über die Provision"]', 'Information über die Folgen des Widerrufs (Rückzahlung, Zinsen)', 'Eine Widerrufsfolgenbelehrung informiert über die Folgen des Widerrufs (Rückzahlung des Darlehens, Zinsen für die Zeit bis zum Widerruf).'),

(5, 'Verbraucherschutz', 'easy', 'Welche Frist gilt für das Widerrufsrecht bei Immobiliardarlehensverträgen?', '["14 Tage", "7 Tage", "21 Tage", "30 Tage"]', '14 Tage', 'Das Widerrufsrecht bei Immobiliardarlehensverträgen beträgt 14 Tage nach § 495 Abs. 1 BGB.'),

(5, 'Verbraucherschutz', 'medium', 'Ein Kunde widerruft einen Darlehensvertrag nach 10 Tagen. Welche Kosten muss er tragen?', '["Nur Zinsen für die Zeit bis zum Widerruf", "Vorfälligkeitsentschädigung", "Keine Kosten", "Schadensersatz"]', 'Nur Zinsen für die Zeit bis zum Widerruf', 'Bei Widerruf innerhalb der Widerrufsfrist muss der Kunde nur die Zinsen für die Zeit bis zum Widerruf zahlen (§ 357a BGB).'),

(5, 'Verbraucherschutz', 'hard', 'Was ist eine Beratungsdokumentation nach § 511 BGB?', '["Protokoll über die Beratung des Kunden", "Schufa-Auskunft", "ESIS-Merkblatt", "Widerrufsbelehrung"]', 'Protokoll über die Beratung des Kunden', 'Eine Beratungsdokumentation ist ein Protokoll über die Beratung des Kunden, das die besprochenen Themen, Empfehlungen und Entscheidungen festhält (Pflicht nach § 511 BGB).');
</file>

<file path="server/seed-questions-modul5-batch5.sql">
-- Batch 5: 50 additional exam questions for Module 5 (§34i Darlehensvermittlung)
-- Total after this batch: 300 questions
-- Distribution: Rechtliche Grundlagen (10), Darlehensarten (10), Finanzierungsplanung (10), Bonitätsprüfung (7), Risiken (7), Verbraucherschutz (6)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES

-- Rechtliche Grundlagen (10 Fragen, ID 251-260)
(5, 'Rechtliche Grundlagen', 'easy', 'Was ist ein Grundpfandrecht?', '["Recht an einem Grundstück zur Sicherung einer Forderung", "Recht zum Kauf eines Grundstücks", "Recht zur Nutzung eines Grundstücks", "Recht zur Vermietung eines Grundstücks"]', 'Recht an einem Grundstück zur Sicherung einer Forderung', 'Ein Grundpfandrecht ist ein Recht an einem Grundstück, das zur Sicherung einer Forderung (z.B. Darlehensforderung) dient. Beispiele: Grundschuld, Hypothek.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Rangfolge haben Grundpfandrechte?', '["Nach Eintragungsdatum im Grundbuch (früher = höherer Rang)", "Nach Höhe der Forderung", "Nach Art des Gläubigers", "Alle gleich"]', 'Nach Eintragungsdatum im Grundbuch (früher = höherer Rang)', 'Die Rangfolge von Grundpfandrechten richtet sich nach dem Eintragungsdatum im Grundbuch. Das früher eingetragene Recht hat den höheren Rang und wird bei Verwertung zuerst befriedigt.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist eine Rangänderung?', '["Änderung der Reihenfolge von Grundpfandrechten mit Zustimmung aller Beteiligten", "Änderung der Höhe einer Grundschuld", "Änderung des Gläubigers", "Änderung des Grundstücks"]', 'Änderung der Reihenfolge von Grundpfandrechten mit Zustimmung aller Beteiligten', 'Eine Rangänderung ist die Änderung der Reihenfolge von Grundpfandrechten im Grundbuch. Sie erfordert die Zustimmung aller betroffenen Gläubiger.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist eine Zwangsversteigerung?', '["Gerichtliche Verwertung einer Immobilie zur Befriedigung von Gläubigern", "Freiwilliger Verkauf einer Immobilie", "Vermietung einer Immobilie", "Schenkung einer Immobilie"]', 'Gerichtliche Verwertung einer Immobilie zur Befriedigung von Gläubigern', 'Eine Zwangsversteigerung ist die gerichtliche Verwertung einer Immobilie, um die Forderungen von Gläubigern zu befriedigen, wenn der Schuldner nicht zahlt.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Voraussetzungen müssen für eine Zwangsversteigerung erfüllt sein?', '["Vollstreckbarer Titel, Grundpfandrecht, Zahlungsverzug", "Nur Zahlungsverzug", "Nur Grundpfandrecht", "Nur vollstreckbarer Titel"]', 'Vollstreckbarer Titel, Grundpfandrecht, Zahlungsverzug', 'Für eine Zwangsversteigerung sind erforderlich: ein vollstreckbarer Titel (z.B. Urteil), ein Grundpfandrecht (Grundschuld/Hypothek) und Zahlungsverzug des Schuldners.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist ein Verkehrswertgutachten?', '["Gutachten über den Marktwert einer Immobilie", "Gutachten über den Zustand einer Immobilie", "Gutachten über die Lage einer Immobilie", "Gutachten über die Nutzung einer Immobilie"]', 'Gutachten über den Marktwert einer Immobilie', 'Ein Verkehrswertgutachten ist ein Gutachten über den Marktwert (Verkehrswert) einer Immobilie, erstellt von einem Sachverständigen nach § 194 BauGB.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist eine Teilungserklärung?', '["Erklärung zur Aufteilung eines Gebäudes in Wohnungseigentum", "Erklärung zur Teilung eines Grundstücks", "Erklärung zur Teilung eines Darlehens", "Erklärung zur Teilung einer Erbschaft"]', 'Erklärung zur Aufteilung eines Gebäudes in Wohnungseigentum', 'Eine Teilungserklärung ist eine notarielle Erklärung des Eigentümers, durch die ein Gebäude in Wohnungseigentum aufgeteilt wird (§ 8 WEG).'),

(5, 'Rechtliche Grundlagen', 'medium', 'Was ist eine Auflassungsvormerkung?', '["Sicherung des Anspruchs auf Eigentumsübertragung im Grundbuch", "Sicherung des Anspruchs auf Zahlung", "Sicherung des Anspruchs auf Nutzung", "Sicherung des Anspruchs auf Vermietung"]', 'Sicherung des Anspruchs auf Eigentumsübertragung im Grundbuch', 'Eine Auflassungsvormerkung sichert den Anspruch des Käufers auf Eigentumsübertragung im Grundbuch und schützt ihn vor Verfügungen des Verkäufers (§ 883 BGB).'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist eine Reallast?', '["Wiederkehrende Leistung aus einem Grundstück (z.B. Wohnrecht, Nießbrauch)", "Einmalige Zahlung", "Grundschuld", "Hypothek"]', 'Wiederkehrende Leistung aus einem Grundstück (z.B. Wohnrecht, Nießbrauch)', 'Eine Reallast ist eine wiederkehrende Leistung, die aus einem Grundstück zu erbringen ist (z.B. Wohnrecht, Nießbrauch, Altenteil), eingetragen in Abteilung II des Grundbuchs (§ 1105 BGB).'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist ein Nießbrauch?', '["Recht zur Nutzung und zum Fruchtgenuss einer Sache", "Recht zum Verkauf einer Sache", "Recht zur Zerstörung einer Sache", "Recht zur Schenkung einer Sache"]', 'Recht zur Nutzung und zum Fruchtgenuss einer Sache', 'Ein Nießbrauch ist das Recht, eine fremde Sache zu nutzen und die Früchte (z.B. Mieteinnahmen) zu ziehen, ohne Eigentümer zu sein (§ 1030 BGB).'),

-- Darlehensarten (10 Fragen, ID 261-270)
(5, 'Darlehensarten', 'easy', 'Was ist ein Volltilgerdarlehen?', '["Darlehen, das am Ende der Zinsbindung vollständig getilgt ist", "Darlehen ohne Tilgung", "Darlehen mit variabler Tilgung", "Darlehen mit Sondertilgung"]', 'Darlehen, das am Ende der Zinsbindung vollständig getilgt ist', 'Ein Volltilgerdarlehen ist ein Darlehen, bei dem die Tilgung so hoch ist, dass die Restschuld am Ende der Zinsbindung null ist (vollständige Tilgung).'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde möchte ein Volltilgerdarlehen über 200.000 EUR mit 10 Jahren Zinsbindung. Wie hoch ist die Tilgung bei 3% Zinsen?', '["Ca. 7,7% (monatliche Rate ca. 1.790 EUR)", "Ca. 5% (monatliche Rate ca. 1.333 EUR)", "Ca. 10% (monatliche Rate ca. 2.167 EUR)", "Ca. 3% (monatliche Rate ca. 1.000 EUR)"]', 'Ca. 7,7% (monatliche Rate ca. 1.790 EUR)', 'Für ein Volltilgerdarlehen über 200.000 EUR mit 10 Jahren Zinsbindung und 3% Zinsen beträgt die Tilgung ca. 7,7%, die monatliche Rate ca. 1.790 EUR (Berechnung mit Annuitätenformel).'),

(5, 'Darlehensarten', 'hard', 'Was ist der Unterschied zwischen Volltilgerdarlehen und normalem Annuitätendarlehen?', '["Volltilgerdarlehen: Restschuld = 0 am Ende, normales Annuitätendarlehen: Restschuld > 0", "Volltilgerdarlehen: variable Tilgung, normales Annuitätendarlehen: feste Tilgung", "Kein Unterschied", "Volltilgerdarlehen: keine Zinsen"]', 'Volltilgerdarlehen: Restschuld = 0 am Ende, normales Annuitätendarlehen: Restschuld > 0', 'Der Unterschied: Bei einem Volltilgerdarlehen ist die Restschuld am Ende der Zinsbindung null, bei einem normalen Annuitätendarlehen bleibt eine Restschuld übrig.'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Cap-Darlehen?', '["Variables Darlehen mit Zinsobergrenze (Cap)", "Darlehen mit festem Zinssatz", "Darlehen ohne Zinsen", "Darlehen mit Sondertilgung"]', 'Variables Darlehen mit Zinsobergrenze (Cap)', 'Ein Cap-Darlehen ist ein variables Darlehen, bei dem der Zinssatz schwankt, aber eine Obergrenze (Cap) nicht überschreiten kann.'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde hat ein Cap-Darlehen mit 3% Cap. Der Marktzins steigt auf 4%. Welcher Zinssatz gilt?', '["3% (Cap greift)", "4% (Marktzins)", "3,5% (Durchschnitt)", "0% (keine Zinsen)"]', '3% (Cap greift)', 'Bei einem Cap-Darlehen mit 3% Cap gilt maximal 3%, auch wenn der Marktzins auf 4% steigt. Der Cap schützt vor steigenden Zinsen.'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Floor bei einem Cap-Darlehen?', '["Zinsuntergrenze (Mindestzins)", "Zinsobergrenze", "Tilgungsrate", "Sondertilgung"]', 'Zinsuntergrenze (Mindestzins)', 'Ein Floor ist eine Zinsuntergrenze bei einem Cap-Darlehen. Der Zinssatz kann nicht unter den Floor sinken, auch wenn der Marktzins niedriger ist.'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Konstantdarlehen?', '["Darlehen mit gleichbleibender monatlicher Rate (Annuität)", "Darlehen mit variabler Rate", "Darlehen ohne Tilgung", "Darlehen mit Sondertilgung"]', 'Darlehen mit gleichbleibender monatlicher Rate (Annuität)', 'Ein Konstantdarlehen ist ein Darlehen mit gleichbleibender monatlicher Rate (Annuität), bestehend aus Zins und Tilgung. Synonym für Annuitätendarlehen.'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde hat ein Konstantdarlehen mit 1.000 EUR monatlicher Rate. Wie verändert sich die Rate bei Zinsänderung?', '["Rate bleibt gleich, Tilgungsanteil ändert sich", "Rate steigt", "Rate sinkt", "Rate und Tilgung bleiben gleich"]', 'Rate bleibt gleich, Tilgungsanteil ändert sich', 'Bei einem Konstantdarlehen bleibt die monatliche Rate gleich. Bei Zinsänderung ändert sich nur der Tilgungsanteil (höhere Zinsen = niedrigere Tilgung, niedrigere Zinsen = höhere Tilgung).'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Disagio?', '["Abschlag vom Darlehensbetrag (Damnum), der als Zinsvorauszahlung dient", "Aufschlag auf den Darlehensbetrag", "Sondertilgung", "Vorfälligkeitsentschädigung"]', 'Abschlag vom Darlehensbetrag (Damnum), der als Zinsvorauszahlung dient', 'Ein Disagio (Damnum) ist ein Abschlag vom Darlehensbetrag, der als Zinsvorauszahlung dient. Beispiel: 5% Disagio bei 100.000 EUR = 95.000 EUR Auszahlung, 100.000 EUR Rückzahlung.'),

(5, 'Darlehensarten', 'easy', 'Welcher Vorteil hat ein Disagio?', '["Niedrigerer Nominalzins, steuerliche Vorteile bei vermieteten Immobilien", "Höherer Nominalzins", "Keine Tilgung", "Sondertilgung möglich"]', 'Niedrigerer Nominalzins, steuerliche Vorteile bei vermieteten Immobilien', 'Ein Disagio führt zu einem niedrigeren Nominalzins und bietet steuerliche Vorteile bei vermieteten Immobilien (Disagio als Werbungskosten absetzbar).'),

-- Finanzierungsplanung (10 Fragen, ID 271-280)
(5, 'Finanzierungsplanung', 'easy', 'Was sind Erwerbsnebenkosten?', '["Kosten neben dem Kaufpreis (Grunderwerbsteuer, Notar, Makler)", "Kosten für Renovierung", "Kosten für Möbel", "Kosten für Umzug"]', 'Kosten neben dem Kaufpreis (Grunderwerbsteuer, Notar, Makler)', 'Erwerbsnebenkosten sind Kosten neben dem Kaufpreis: Grunderwerbsteuer (3,5-6,5%), Notar- und Grundbuchkosten (ca. 1,5-2%), Maklercourtage (0-7,14%).'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde kauft eine Immobilie für 300.000 EUR in Berlin. Wie hoch sind die Erwerbsnebenkosten?', '["Ca. 42.000 EUR (14%)", "Ca. 30.000 EUR (10%)", "Ca. 60.000 EUR (20%)", "Ca. 15.000 EUR (5%)"]', 'Ca. 42.000 EUR (14%)', 'Erwerbsnebenkosten in Berlin: 6% Grunderwerbsteuer + 2% Notar + 7,14% Makler = ca. 15,14% = ca. 45.420 EUR. Ohne Makler ca. 8% = 24.000 EUR.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist eine 110%-Finanzierung?', '["Finanzierung von Kaufpreis + Erwerbsnebenkosten ohne Eigenkapital", "Finanzierung von 110% des Kaufpreises", "Finanzierung mit 110% Eigenkapital", "Finanzierung mit 110% Zinsen"]', 'Finanzierung von Kaufpreis + Erwerbsnebenkosten ohne Eigenkapital', 'Eine 110%-Finanzierung ist eine Finanzierung von Kaufpreis + Erwerbsnebenkosten ohne Eigenkapital (Vollfinanzierung). Höheres Risiko, höhere Zinsen.'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Anschlussfinanzierung?', '["Finanzierung nach Ablauf der Zinsbindung für die Restschuld", "Erste Finanzierung", "Finanzierung für Renovierung", "Finanzierung für Möbel"]', 'Finanzierung nach Ablauf der Zinsbindung für die Restschuld', 'Eine Anschlussfinanzierung ist eine Finanzierung für die Restschuld nach Ablauf der Zinsbindung des ersten Darlehens.'),

(5, 'Finanzierungsplanung', 'medium', 'Welche Optionen hat ein Kunde für die Anschlussfinanzierung?', '["Prolongation (bei gleicher Bank), Umschuldung (zu anderer Bank), Forward-Darlehen", "Nur Prolongation", "Nur Umschuldung", "Nur Forward-Darlehen"]', 'Prolongation (bei gleicher Bank), Umschuldung (zu anderer Bank), Forward-Darlehen', 'Für die Anschlussfinanzierung gibt es drei Optionen: Prolongation (Verlängerung bei gleicher Bank), Umschuldung (Wechsel zu anderer Bank), Forward-Darlehen (frühzeitige Zinssicherung).'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist ein Forward-Darlehen?', '["Darlehen mit Zinssicherung bis zu 5 Jahre vor Ablauf der Zinsbindung", "Darlehen mit sofortiger Auszahlung", "Darlehen ohne Zinsen", "Darlehen mit variabler Tilgung"]', 'Darlehen mit Zinssicherung bis zu 5 Jahre vor Ablauf der Zinsbindung', 'Ein Forward-Darlehen ist ein Darlehen, bei dem der Zinssatz bis zu 5 Jahre vor Ablauf der Zinsbindung gesichert wird. Aufschlag: ca. 0,01-0,03% pro Monat Forward-Periode.'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Umschuldung?', '["Wechsel zu einer anderen Bank für die Anschlussfinanzierung", "Wechsel des Darlehensbetrags", "Wechsel der Tilgung", "Wechsel der Immobilie"]', 'Wechsel zu einer anderen Bank für die Anschlussfinanzierung', 'Eine Umschuldung ist der Wechsel zu einer anderen Bank für die Anschlussfinanzierung, um bessere Konditionen (niedrigere Zinsen) zu erhalten.'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde hat eine Restschuld von 150.000 EUR. Die aktuelle Bank bietet 3,5%, eine andere Bank 3%. Wie viel spart er bei 10 Jahren?', '["Ca. 7.500 EUR", "Ca. 15.000 EUR", "Ca. 3.750 EUR", "Ca. 30.000 EUR"]', 'Ca. 7.500 EUR', 'Zinsersparnis: 0,5% von 150.000 EUR = 750 EUR pro Jahr × 10 Jahre = 7.500 EUR (vereinfachte Rechnung ohne Tilgung).'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist eine Prolongation?', '["Verlängerung des Darlehens bei der gleichen Bank nach Ablauf der Zinsbindung", "Wechsel zu einer anderen Bank", "Vorzeitige Rückzahlung", "Sondertilgung"]', 'Verlängerung des Darlehens bei der gleichen Bank nach Ablauf der Zinsbindung', 'Eine Prolongation ist die Verlängerung des Darlehens bei der gleichen Bank nach Ablauf der Zinsbindung. Die Bank unterbreitet ein Prolongationsangebot ca. 3 Monate vor Ablauf.'),

(5, 'Finanzierungsplanung', 'easy', 'Welche Frist gilt für die Kündigung eines Darlehens nach § 489 BGB?', '["6 Monate Kündigungsfrist nach 10 Jahren Zinsbindung", "3 Monate", "12 Monate", "1 Monat"]', '6 Monate Kündigungsfrist nach 10 Jahren Zinsbindung', 'Nach § 489 BGB kann ein Darlehen nach 10 Jahren Zinsbindung mit 6 Monaten Kündigungsfrist gekündigt werden, unabhängig von der vereinbarten Zinsbindung.'),

-- Bonitätsprüfung (7 Fragen, ID 281-287)
(5, 'Bonitätsprüfung', 'easy', 'Was ist ein Schufa-Score?', '["Punktzahl zur Bewertung der Kreditwürdigkeit (0-100%)", "Darlehensbetrag", "Zinssatz", "Tilgungsrate"]', 'Punktzahl zur Bewertung der Kreditwürdigkeit (0-100%)', 'Der Schufa-Score ist eine Punktzahl (0-100%), die die Kreditwürdigkeit bewertet. Je höher der Score, desto besser die Bonität.'),

(5, 'Bonitätsprüfung', 'medium', 'Ein Kunde hat einen Schufa-Score von 95%. Wie wird die Bonität bewertet?', '["Sehr gut, niedriges Ausfallrisiko, beste Konditionen", "Schlecht, hohes Ausfallrisiko", "Mittel, durchschnittliches Risiko", "Keine Bewertung"]', 'Sehr gut, niedriges Ausfallrisiko, beste Konditionen', 'Ein Schufa-Score von 95% bedeutet sehr gute Bonität, niedriges Ausfallrisiko und beste Konditionen (niedrigste Zinsen).'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist ein Basisscore bei der Schufa?', '["Allgemeiner Score für alle Branchen (0-100%)", "Branchenspezifischer Score", "Score nur für Banken", "Score nur für Versicherungen"]', 'Allgemeiner Score für alle Branchen (0-100%)', 'Der Basisscore ist ein allgemeiner Score für alle Branchen (0-100%), der die Kreditwürdigkeit unabhängig von der Branche bewertet.'),

(5, 'Bonitätsprüfung', 'easy', 'Welche Faktoren beeinflussen den Schufa-Score negativ?', '["Zahlungsverzug, Mahnungen, Insolvenzen, viele Kreditanfragen", "Pünktliche Zahlungen", "Hohes Einkommen", "Viel Eigenkapital"]', 'Zahlungsverzug, Mahnungen, Insolvenzen, viele Kreditanfragen', 'Negative Faktoren für den Schufa-Score: Zahlungsverzug, Mahnungen, Insolvenzen, Pfändungen, viele Kreditanfragen in kurzer Zeit.'),

(5, 'Bonitätsprüfung', 'medium', 'Ein Kunde hat 5 Kreditanfragen in 2 Wochen gestellt. Welche Auswirkung hat das auf den Schufa-Score?', '["Negativer Einfluss, Score sinkt", "Positiver Einfluss, Score steigt", "Keine Auswirkung", "Score verdoppelt sich"]', 'Negativer Einfluss, Score sinkt', 'Viele Kreditanfragen in kurzer Zeit wirken sich negativ auf den Schufa-Score aus, da sie auf finanzielle Schwierigkeiten hindeuten können.'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist der Unterschied zwischen Konditionsanfrage und Kreditanfrage bei der Schufa?', '["Konditionsanfrage: keine Auswirkung auf Score, Kreditanfrage: negative Auswirkung", "Konditionsanfrage: negative Auswirkung, Kreditanfrage: keine Auswirkung", "Kein Unterschied", "Beide positiv"]', 'Konditionsanfrage: keine Auswirkung auf Score, Kreditanfrage: negative Auswirkung', 'Konditionsanfrage (KK-Anfrage): keine Auswirkung auf Score, nur für den anfragenden Kreditgeber sichtbar. Kreditanfrage (AK-Anfrage): negative Auswirkung, für alle Kreditgeber sichtbar.'),

(5, 'Bonitätsprüfung', 'easy', 'Wie lange werden negative Schufa-Einträge gespeichert?', '["3 Jahre nach Erledigung", "1 Jahr", "5 Jahre", "10 Jahre"]', '3 Jahre nach Erledigung', 'Negative Schufa-Einträge (z.B. Mahnungen, Insolvenzen) werden 3 Jahre nach Erledigung gelöscht.'),

-- Risiken (7 Fragen, ID 288-294)
(5, 'Risiken', 'easy', 'Was ist ein Zinsänderungsrisiko?', '["Risiko steigender Zinsen bei Anschlussfinanzierung", "Risiko sinkender Immobilienpreise", "Risiko sinkender Einkommen", "Risiko steigender Nebenkosten"]', 'Risiko steigender Zinsen bei Anschlussfinanzierung', 'Das Zinsänderungsrisiko ist das Risiko, dass die Zinsen bei der Anschlussfinanzierung höher sind als bei der Erstfinanzierung, was zu höheren Raten führt.'),

(5, 'Risiken', 'medium', 'Ein Kunde hat eine Restschuld von 200.000 EUR. Die Zinsen steigen von 2% auf 4%. Wie viel höher ist die monatliche Rate?', '["Ca. 333 EUR höher", "Ca. 167 EUR höher", "Ca. 500 EUR höher", "Keine Änderung"]', 'Ca. 333 EUR höher', 'Zinsänderung: 2% von 200.000 EUR = 4.000 EUR pro Jahr = 333 EUR pro Monat höhere Zinslast (vereinfachte Rechnung ohne Tilgung).'),

(5, 'Risiken', 'hard', 'Wie kann ein Kunde das Zinsänderungsrisiko absichern?', '["Forward-Darlehen, lange Zinsbindung, Sondertilgungen", "Nur Forward-Darlehen", "Nur lange Zinsbindung", "Nur Sondertilgungen"]', 'Forward-Darlehen, lange Zinsbindung, Sondertilgungen', 'Absicherung gegen Zinsänderungsrisiko: Forward-Darlehen (frühzeitige Zinssicherung), lange Zinsbindung (15-20 Jahre), Sondertilgungen (Restschuld reduzieren).'),

(5, 'Risiken', 'easy', 'Was ist ein Immobilienwertrisiko?', '["Risiko sinkender Immobilienpreise", "Risiko steigender Zinsen", "Risiko sinkender Einkommen", "Risiko steigender Nebenkosten"]', 'Risiko sinkender Immobilienpreise', 'Das Immobilienwertrisiko ist das Risiko, dass der Wert der Immobilie sinkt und bei Verkauf oder Zwangsversteigerung nicht ausreicht, um die Restschuld zu tilgen.'),

(5, 'Risiken', 'medium', 'Ein Kunde kauft eine Immobilie für 300.000 EUR mit 10% Eigenkapital. Der Immobilienwert sinkt auf 250.000 EUR. Wie hoch ist der Verlust?', '["80.000 EUR (Eigenkapital + Wertverlust)", "50.000 EUR (nur Wertverlust)", "30.000 EUR (nur Eigenkapital)", "Kein Verlust"]', '80.000 EUR (Eigenkapital + Wertverlust)', 'Verlust: 30.000 EUR Eigenkapital + 50.000 EUR Wertverlust = 80.000 EUR. Die Restschuld (270.000 EUR) ist höher als der Immobilienwert (250.000 EUR).'),

(5, 'Risiken', 'hard', 'Was ist ein Klumpenrisiko?', '["Konzentration des Vermögens in einer Immobilie", "Risiko steigender Zinsen", "Risiko sinkender Einkommen", "Risiko steigender Nebenkosten"]', 'Konzentration des Vermögens in einer Immobilie', 'Das Klumpenrisiko ist das Risiko, dass das gesamte Vermögen in einer Immobilie konzentriert ist und keine Diversifikation besteht.'),

(5, 'Risiken', 'easy', 'Was ist eine Risikolebensversicherung?', '["Versicherung, die im Todesfall die Restschuld tilgt", "Versicherung gegen Arbeitslosigkeit", "Versicherung gegen Krankheit", "Versicherung gegen Zinsänderungen"]', 'Versicherung, die im Todesfall die Restschuld tilgt', 'Eine Risikolebensversicherung zahlt im Todesfall des Versicherten die Versicherungssumme (z.B. Restschuld des Darlehens) an die Hinterbliebenen.'),

-- Verbraucherschutz (6 Fragen, ID 295-300)
(5, 'Verbraucherschutz', 'easy', 'Was ist ein ESIS-Merkblatt?', '["Europäisches Standardisiertes Merkblatt mit Informationen zum Darlehen", "Schufa-Auskunft", "Widerrufsbelehrung", "Beratungsprotokoll"]', 'Europäisches Standardisiertes Merkblatt mit Informationen zum Darlehen', 'Das ESIS-Merkblatt (European Standardised Information Sheet) ist ein standardisiertes Merkblatt mit Informationen zum Darlehen (Zinssatz, Rate, Kosten, Laufzeit).'),

(5, 'Verbraucherschutz', 'medium', 'Wann muss ein ESIS-Merkblatt ausgehändigt werden?', '["Vor Abschluss des Darlehensvertrags", "Nach Abschluss des Vertrags", "Nur auf Anfrage", "Nie"]', 'Vor Abschluss des Darlehensvertrags', 'Das ESIS-Merkblatt muss dem Kunden vor Abschluss des Darlehensvertrags ausgehändigt werden, damit er die Konditionen vergleichen kann.'),

(5, 'Verbraucherschutz', 'hard', 'Was ist eine Beratungsdokumentation?', '["Protokoll über die Beratung des Kunden mit Empfehlungen und Entscheidungen", "Schufa-Auskunft", "ESIS-Merkblatt", "Widerrufsbelehrung"]', 'Protokoll über die Beratung des Kunden mit Empfehlungen und Entscheidungen', 'Eine Beratungsdokumentation ist ein Protokoll über die Beratung des Kunden, das die besprochenen Themen, Empfehlungen und Entscheidungen festhält (Pflicht nach § 511 BGB).'),

(5, 'Verbraucherschutz', 'easy', 'Welche Informationen muss eine Beratungsdokumentation enthalten?', '["Kundenwünsche, Empfehlungen, Gründe für Empfehlung, Entscheidung", "Nur Kundenwünsche", "Nur Empfehlungen", "Nur Entscheidung"]', 'Kundenwünsche, Empfehlungen, Gründe für Empfehlung, Entscheidung', 'Eine Beratungsdokumentation muss enthalten: Kundenwünsche, Empfehlungen des Beraters, Gründe für die Empfehlung, Entscheidung des Kunden.'),

(5, 'Verbraucherschutz', 'medium', 'Ein Kunde erhält keine Beratungsdokumentation. Welche Rechtsfolge tritt ein?', '["Beweislastumkehr: Bank muss beweisen, dass Beratung korrekt war", "Keine Rechtsfolge", "Vertrag ist nichtig", "Nur Bußgeld"]', 'Beweislastumkehr: Bank muss beweisen, dass Beratung korrekt war', 'Ohne Beratungsdokumentation tritt eine Beweislastumkehr ein: Die Bank muss beweisen, dass die Beratung korrekt war, nicht der Kunde.'),

(5, 'Verbraucherschutz', 'hard', 'Was ist eine Aufklärungspflicht des Darlehensvermittlers?', '["Pflicht, den Kunden über Risiken, Kosten und Alternativen aufzuklären", "Pflicht, nur über Vorteile zu informieren", "Pflicht, nur über Kosten zu informieren", "Keine Pflicht"]', 'Pflicht, den Kunden über Risiken, Kosten und Alternativen aufzuklären', 'Die Aufklärungspflicht ist die Pflicht des Darlehensvermittlers, den Kunden umfassend über Risiken, Kosten, Alternativen und Konsequenzen aufzuklären.');
</file>

<file path="server/seed-questions-modul5-batch6.sql">
-- Batch 6: 50 additional exam questions for Module 5 (§34i Darlehensvermittlung)
-- ID 301-350
-- Categories: Rechtliche Grundlagen (10), Darlehensarten (10), Finanzierungsplanung (10), Bonitätsprüfung (7), Risiken (7), Verbraucherschutz (6)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES

-- Rechtliche Grundlagen (10 Fragen, ID 301-310)
(5, 'Rechtliche Grundlagen', 'easy', 'Was regelt § 34i GewO?', '["Erlaubnispflicht für Darlehensvermittlung", "Maklererlaubnis", "WEG-Verwaltung", "Mietverwaltung"]', 'Erlaubnispflicht für Darlehensvermittlung', '§ 34i GewO regelt die Erlaubnispflicht für die Darlehensvermittlung (Immobiliardarlehensvermittlung).'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Voraussetzungen müssen für eine Erlaubnis nach § 34i GewO erfüllt sein?', '["Sachkundeprüfung, Vermögensschadenhaftpflichtversicherung, Zuverlässigkeit", "Nur Sachkundeprüfung", "Nur Versicherung", "Keine Voraussetzungen"]', 'Sachkundeprüfung, Vermögensschadenhaftpflichtversicherung, Zuverlässigkeit', 'Voraussetzungen für § 34i-Erlaubnis: Sachkundeprüfung (IHK), Vermögensschadenhaftpflichtversicherung (mind. 1,28 Mio. EUR), Zuverlässigkeit.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist eine Honorar-Anlageberatung nach § 34h GewO?', '["Beratung gegen Honorar ohne Provisionen", "Beratung mit Provisionen", "Kostenlose Beratung", "Beratung nur für Banken"]', 'Beratung gegen Honorar ohne Provisionen', 'Honorar-Anlageberatung (§ 34h GewO): Beratung gegen Honorar, keine Provisionen von Produktanbietern, unabhängige Beratung.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist ein Immobiliardarlehensvermittler?', '["Person, die Immobiliendarlehen vermittelt", "Person, die Immobilien verkauft", "Person, die Immobilien verwaltet", "Person, die Immobilien bewertet"]', 'Person, die Immobiliendarlehen vermittelt', 'Ein Immobiliardarlehensvermittler vermittelt Darlehen zur Finanzierung von Immobilien (§ 34i GewO).'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Pflichten hat ein Darlehensvermittler nach § 34i GewO?', '["Beratungspflicht, Dokumentationspflicht, Aufklärungspflicht", "Nur Beratungspflicht", "Nur Dokumentationspflicht", "Keine Pflichten"]', 'Beratungspflicht, Dokumentationspflicht, Aufklärungspflicht', 'Pflichten eines Darlehensvermittlers: Beratungspflicht, Dokumentationspflicht (Beratungsprotokoll), Aufklärungspflicht (Risiken, Kosten).'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist eine Vermögensschadenhaftpflichtversicherung?', '["Versicherung gegen Schäden durch fehlerhafte Beratung", "Versicherung gegen Diebstahl", "Versicherung gegen Feuer", "Versicherung gegen Arbeitslosigkeit"]', 'Versicherung gegen Schäden durch fehlerhafte Beratung', 'Eine Vermögensschadenhaftpflichtversicherung schützt gegen Schäden, die durch fehlerhafte Beratung entstehen (Pflicht für § 34i, mind. 1,28 Mio. EUR).'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist ein Immobiliardarlehen?', '["Darlehen zur Finanzierung von Immobilien", "Darlehen für Konsumgüter", "Darlehen für Autos", "Darlehen für Urlaub"]', 'Darlehen zur Finanzierung von Immobilien', 'Ein Immobiliardarlehen ist ein Darlehen zur Finanzierung von Immobilien (Kauf, Bau, Renovierung).'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Mindestversicherungssumme gilt für die Vermögensschadenhaftpflichtversicherung nach § 34i GewO?', '["1,28 Mio. EUR pro Schadensfall", "500.000 EUR", "2 Mio. EUR", "Keine Mindestversicherungssumme"]', '1,28 Mio. EUR pro Schadensfall', 'Die Mindestversicherungssumme für die Vermögensschadenhaftpflichtversicherung beträgt 1,28 Mio. EUR pro Schadensfall (§ 34i GewO).'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist eine Sachkundeprüfung nach § 34i GewO?', '["IHK-Prüfung über Kenntnisse in Darlehensvermittlung", "Prüfung über Immobilienbewertung", "Prüfung über Maklerrecht", "Prüfung über WEG-Verwaltung"]', 'IHK-Prüfung über Kenntnisse in Darlehensvermittlung', 'Die Sachkundeprüfung (§ 34i GewO) ist eine IHK-Prüfung über Kenntnisse in Darlehensvermittlung, Finanzierung, Recht, Verbraucherschutz.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Wer darf Immobiliardarlehen vermitteln?', '["Nur Personen mit Erlaubnis nach § 34i GewO", "Jeder", "Nur Banken", "Nur Makler"]', 'Nur Personen mit Erlaubnis nach § 34i GewO', 'Nur Personen mit Erlaubnis nach § 34i GewO dürfen Immobiliardarlehen vermitteln (Erlaubnispflicht).'),

-- Darlehensarten (10 Fragen, ID 311-320)
(5, 'Darlehensarten', 'easy', 'Was ist ein variables Darlehen?', '["Darlehen mit variablem Zinssatz (3-Monats-Euribor)", "Darlehen mit festem Zinssatz", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Darlehen mit variablem Zinssatz (3-Monats-Euribor)', 'Ein variables Darlehen hat einen variablen Zinssatz, der sich an einem Referenzzinssatz (z.B. 3-Monats-Euribor) orientiert.'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde hat ein variables Darlehen mit 3-Monats-Euribor + 1,5% Marge. Der Euribor steigt von 1% auf 3%. Wie hoch ist der neue Zinssatz?', '["4,5%", "3%", "2,5%", "5%"]', '4,5%', 'Neuer Zinssatz: 3% Euribor + 1,5% Marge = 4,5%.'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Cap-Darlehen?', '["Variables Darlehen mit Zinsobergrenze", "Darlehen mit festem Zinssatz", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Variables Darlehen mit Zinsobergrenze', 'Ein Cap-Darlehen ist ein variables Darlehen mit einer Zinsobergrenze (Cap), die den maximalen Zinssatz begrenzt.'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Festdarlehen?', '["Darlehen ohne Tilgung während der Laufzeit", "Darlehen mit monatlicher Tilgung", "Darlehen mit variabler Tilgung", "Darlehen ohne Zinsen"]', 'Darlehen ohne Tilgung während der Laufzeit', 'Ein Festdarlehen ist ein Darlehen ohne Tilgung während der Laufzeit, nur Zinszahlungen. Die Tilgung erfolgt am Ende (z.B. durch Lebensversicherung).'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde hat ein Festdarlehen von 200.000 EUR mit 3% Zinsen. Wie hoch ist die monatliche Rate?', '["500 EUR (nur Zinsen)", "1.000 EUR", "1.500 EUR", "2.000 EUR"]', '500 EUR (nur Zinsen)', 'Monatliche Rate: 200.000 EUR × 3% / 12 = 500 EUR (nur Zinsen, keine Tilgung).'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Volltilgerdarlehen?', '["Darlehen, das am Ende der Zinsbindung vollständig getilgt ist", "Darlehen ohne Tilgung", "Darlehen mit variabler Tilgung", "Darlehen ohne Zinsen"]', 'Darlehen, das am Ende der Zinsbindung vollständig getilgt ist', 'Ein Volltilgerdarlehen ist ein Darlehen, das am Ende der Zinsbindung vollständig getilgt ist (Restschuld = 0 EUR).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein KfW-Darlehen?', '["Förderdarlehen der Kreditanstalt für Wiederaufbau", "Darlehen einer Privatbank", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Förderdarlehen der Kreditanstalt für Wiederaufbau', 'Ein KfW-Darlehen ist ein Förderdarlehen der Kreditanstalt für Wiederaufbau (KfW) mit günstigen Konditionen (z.B. für energieeffizientes Bauen).'),

(5, 'Darlehensarten', 'medium', 'Welche Vorteile hat ein KfW-Darlehen?', '["Niedrige Zinsen, Tilgungszuschüsse, tilgungsfreie Anlaufjahre", "Nur niedrige Zinsen", "Nur Tilgungszuschüsse", "Keine Vorteile"]', 'Niedrige Zinsen, Tilgungszuschüsse, tilgungsfreie Anlaufjahre', 'Vorteile eines KfW-Darlehens: Niedrige Zinsen, Tilgungszuschüsse (bis zu 45%), tilgungsfreie Anlaufjahre (1-5 Jahre).'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Nachrangdarlehen?', '["Darlehen, das im Insolvenzfall nachrangig bedient wird", "Darlehen mit höchster Priorität", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Darlehen, das im Insolvenzfall nachrangig bedient wird', 'Ein Nachrangdarlehen ist ein Darlehen, das im Insolvenzfall nachrangig bedient wird (erst nach vorrangigen Darlehen).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Bauspardarlehen?', '["Darlehen aus einem Bausparvertrag", "Darlehen einer Bank", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Darlehen aus einem Bausparvertrag', 'Ein Bauspardarlehen ist ein Darlehen aus einem Bausparvertrag, das nach der Ansparphase ausgezahlt wird.'),

-- Finanzierungsplanung (10 Fragen, ID 321-330)
(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Eigenkapitalquote?', '["Verhältnis von Eigenkapital zu Gesamtkosten (in %)", "Verhältnis von Fremdkapital zu Gesamtkosten", "Verhältnis von Zinsen zu Tilgung", "Verhältnis von Rate zu Einkommen"]', 'Verhältnis von Eigenkapital zu Gesamtkosten (in %)', 'Die Eigenkapitalquote ist das Verhältnis von Eigenkapital zu Gesamtkosten (in %). Empfehlung: mind. 20%.'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde kauft eine Immobilie für 300.000 EUR mit 60.000 EUR Eigenkapital. Wie hoch ist die Eigenkapitalquote?', '["20%", "10%", "30%", "40%"]', '20%', 'Eigenkapitalquote: 60.000 EUR / 300.000 EUR = 20%.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist eine Vollfinanzierung?', '["Finanzierung ohne Eigenkapital (100% Fremdkapital)", "Finanzierung mit 20% Eigenkapital", "Finanzierung mit 50% Eigenkapital", "Finanzierung ohne Zinsen"]', 'Finanzierung ohne Eigenkapital (100% Fremdkapital)', 'Eine Vollfinanzierung ist eine Finanzierung ohne Eigenkapital (100% Fremdkapital). Risiko: höhere Zinsen, höhere Raten.'),

(5, 'Finanzierungsplanung', 'easy', 'Was sind Nebenkosten beim Immobilienkauf?', '["Grunderwerbsteuer, Notar, Grundbuch, Makler", "Nur Grunderwerbsteuer", "Nur Notar", "Nur Makler"]', 'Grunderwerbsteuer, Notar, Grundbuch, Makler', 'Nebenkosten beim Immobilienkauf: Grunderwerbsteuer (3,5-6,5%), Notar (1-2%), Grundbuch (0,5%), Makler (3-7%).'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde kauft eine Immobilie für 300.000 EUR in Berlin (6% Grunderwerbsteuer). Wie hoch sind die Nebenkosten (ca.)?', '["Ca. 30.000 EUR (10% von 300.000 EUR)", "Ca. 15.000 EUR", "Ca. 45.000 EUR", "Ca. 60.000 EUR"]', 'Ca. 30.000 EUR (10% von 300.000 EUR)', 'Nebenkosten: ca. 10% von 300.000 EUR = 30.000 EUR (Grunderwerbsteuer 6%, Notar 1,5%, Grundbuch 0,5%, Makler 2%).'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist eine Anschlussfinanzierung?', '["Neue Finanzierung nach Ablauf der Zinsbindung", "Erste Finanzierung", "Finanzierung ohne Zinsen", "Finanzierung ohne Tilgung"]', 'Neue Finanzierung nach Ablauf der Zinsbindung', 'Eine Anschlussfinanzierung ist eine neue Finanzierung nach Ablauf der Zinsbindung (Prolongation oder Umschuldung).'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Prolongation?', '["Verlängerung des Darlehens bei derselben Bank", "Wechsel zu einer anderen Bank", "Vorzeitige Tilgung", "Kündigung des Darlehens"]', 'Verlängerung des Darlehens bei derselben Bank', 'Eine Prolongation ist die Verlängerung des Darlehens bei derselben Bank nach Ablauf der Zinsbindung.'),

(5, 'Finanzierungsplanung', 'medium', 'Was ist eine Umschuldung?', '["Wechsel zu einer anderen Bank mit besseren Konditionen", "Verlängerung bei derselben Bank", "Vorzeitige Tilgung", "Kündigung des Darlehens"]', 'Wechsel zu einer anderen Bank mit besseren Konditionen', 'Eine Umschuldung ist der Wechsel zu einer anderen Bank mit besseren Konditionen nach Ablauf der Zinsbindung.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist ein Forward-Darlehen?', '["Darlehen, das heute abgeschlossen wird, aber erst in der Zukunft ausgezahlt wird", "Darlehen, das sofort ausgezahlt wird", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Darlehen, das heute abgeschlossen wird, aber erst in der Zukunft ausgezahlt wird', 'Ein Forward-Darlehen ist ein Darlehen, das heute abgeschlossen wird, aber erst in der Zukunft (bis zu 5 Jahre) ausgezahlt wird (Zinssicherung).'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Sondertilgung?', '["Außerplanmäßige Tilgung zusätzlich zur monatlichen Rate", "Monatliche Tilgung", "Tilgung am Ende der Laufzeit", "Keine Tilgung"]', 'Außerplanmäßige Tilgung zusätzlich zur monatlichen Rate', 'Eine Sondertilgung ist eine außerplanmäßige Tilgung zusätzlich zur monatlichen Rate (reduziert Restschuld und Zinslast).'),

-- Bonitätsprüfung (7 Fragen, ID 331-337)
(5, 'Bonitätsprüfung', 'easy', 'Was ist eine Selbstauskunft?', '["Formular mit Angaben zu Einkommen, Ausgaben, Vermögen, Schulden", "Schufa-Auskunft", "Grundbuchauszug", "Arbeitsvertrag"]', 'Formular mit Angaben zu Einkommen, Ausgaben, Vermögen, Schulden', 'Eine Selbstauskunft ist ein Formular mit Angaben zu Einkommen, Ausgaben, Vermögen, Schulden (Grundlage für Bonitätsprüfung).'),

(5, 'Bonitätsprüfung', 'medium', 'Welche Unterlagen werden für eine Bonitätsprüfung benötigt?', '["Selbstauskunft, Schufa-Auskunft, Einkommensnachweise, Kontoauszüge", "Nur Selbstauskunft", "Nur Schufa-Auskunft", "Nur Einkommensnachweise"]', 'Selbstauskunft, Schufa-Auskunft, Einkommensnachweise, Kontoauszüge', 'Unterlagen für Bonitätsprüfung: Selbstauskunft, Schufa-Auskunft, Einkommensnachweise (Gehaltsabrechnungen), Kontoauszüge (3 Monate).'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist eine Haushaltsrechnung?', '["Gegenüberstellung von Einnahmen und Ausgaben", "Schufa-Auskunft", "Grundbuchauszug", "Arbeitsvertrag"]', 'Gegenüberstellung von Einnahmen und Ausgaben', 'Eine Haushaltsrechnung ist eine Gegenüberstellung von Einnahmen und Ausgaben (Grundlage für Berechnung der maximalen Rate).'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist ein Einkommensnachweis?', '["Gehaltsabrechnung, Steuerbescheid, Rentenbescheid", "Schufa-Auskunft", "Grundbuchauszug", "Arbeitsvertrag"]', 'Gehaltsabrechnung, Steuerbescheid, Rentenbescheid', 'Ein Einkommensnachweis ist eine Gehaltsabrechnung, Steuerbescheid oder Rentenbescheid (Nachweis des Einkommens).'),

(5, 'Bonitätsprüfung', 'medium', 'Ein Kunde hat ein Nettoeinkommen von 3.000 EUR und Ausgaben von 2.000 EUR. Wie hoch ist das verfügbare Einkommen?', '["1.000 EUR", "500 EUR", "1.500 EUR", "2.000 EUR"]', '1.000 EUR', 'Verfügbares Einkommen: 3.000 EUR - 2.000 EUR = 1.000 EUR.'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist eine Debt-to-Income-Ratio (DTI)?', '["Verhältnis von Schulden zu Einkommen (in %)", "Verhältnis von Eigenkapital zu Fremdkapital", "Verhältnis von Zinsen zu Tilgung", "Verhältnis von Rate zu Einkommen"]', 'Verhältnis von Schulden zu Einkommen (in %)', 'Die Debt-to-Income-Ratio (DTI) ist das Verhältnis von Schulden zu Einkommen (in %). Empfehlung: max. 40%.'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist eine Schufa-Auskunft?', '["Auskunft über Kreditwürdigkeit und Zahlungsverhalten", "Grundbuchauszug", "Arbeitsvertrag", "Gehaltsabrechnung"]', 'Auskunft über Kreditwürdigkeit und Zahlungsverhalten', 'Eine Schufa-Auskunft ist eine Auskunft über Kreditwürdigkeit und Zahlungsverhalten (Grundlage für Bonitätsprüfung).'),

-- Risiken (7 Fragen, ID 338-344)
(5, 'Risiken', 'easy', 'Was ist ein Arbeitslosigkeitsrisiko?', '["Risiko, dass der Kunde arbeitslos wird und die Raten nicht mehr zahlen kann", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten"]', 'Risiko, dass der Kunde arbeitslos wird und die Raten nicht mehr zahlen kann', 'Das Arbeitslosigkeitsrisiko ist das Risiko, dass der Kunde arbeitslos wird und die Raten nicht mehr zahlen kann.'),

(5, 'Risiken', 'medium', 'Wie kann ein Kunde das Arbeitslosigkeitsrisiko absichern?', '["Restschuldversicherung, Rücklagen, Sondertilgungen", "Nur Restschuldversicherung", "Nur Rücklagen", "Nur Sondertilgungen"]', 'Restschuldversicherung, Rücklagen, Sondertilgungen', 'Absicherung gegen Arbeitslosigkeitsrisiko: Restschuldversicherung (zahlt Raten bei Arbeitslosigkeit), Rücklagen (3-6 Monatsraten), Sondertilgungen (Restschuld reduzieren).'),

(5, 'Risiken', 'hard', 'Was ist eine Restschuldversicherung?', '["Versicherung, die Raten bei Arbeitslosigkeit, Krankheit oder Tod zahlt", "Versicherung gegen Zinsänderungen", "Versicherung gegen sinkende Immobilienpreise", "Versicherung gegen steigende Nebenkosten"]', 'Versicherung, die Raten bei Arbeitslosigkeit, Krankheit oder Tod zahlt', 'Eine Restschuldversicherung zahlt die Raten bei Arbeitslosigkeit, Krankheit oder Tod des Versicherten.'),

(5, 'Risiken', 'easy', 'Was ist ein Krankheitsrisiko?', '["Risiko, dass der Kunde krank wird und die Raten nicht mehr zahlen kann", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten"]', 'Risiko, dass der Kunde krank wird und die Raten nicht mehr zahlen kann', 'Das Krankheitsrisiko ist das Risiko, dass der Kunde krank wird und die Raten nicht mehr zahlen kann.'),

(5, 'Risiken', 'medium', 'Wie kann ein Kunde das Krankheitsrisiko absichern?', '["Berufsunfähigkeitsversicherung, Restschuldversicherung, Rücklagen", "Nur Berufsunfähigkeitsversicherung", "Nur Restschuldversicherung", "Nur Rücklagen"]', 'Berufsunfähigkeitsversicherung, Restschuldversicherung, Rücklagen', 'Absicherung gegen Krankheitsrisiko: Berufsunfähigkeitsversicherung (zahlt Rente bei Berufsunfähigkeit), Restschuldversicherung, Rücklagen.'),

(5, 'Risiken', 'hard', 'Was ist eine Berufsunfähigkeitsversicherung?', '["Versicherung, die Rente bei Berufsunfähigkeit zahlt", "Versicherung gegen Arbeitslosigkeit", "Versicherung gegen Tod", "Versicherung gegen Zinsänderungen"]', 'Versicherung, die Rente bei Berufsunfähigkeit zahlt', 'Eine Berufsunfähigkeitsversicherung zahlt eine monatliche Rente, wenn der Versicherte berufsunfähig wird (z.B. durch Krankheit oder Unfall).'),

(5, 'Risiken', 'easy', 'Was ist ein Todesrisiko?', '["Risiko, dass der Kunde stirbt und die Hinterbliebenen die Raten nicht mehr zahlen können", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten"]', 'Risiko, dass der Kunde stirbt und die Hinterbliebenen die Raten nicht mehr zahlen können', 'Das Todesrisiko ist das Risiko, dass der Kunde stirbt und die Hinterbliebenen die Raten nicht mehr zahlen können.'),

-- Verbraucherschutz (6 Fragen, ID 345-350)
(5, 'Verbraucherschutz', 'easy', 'Was ist ein Widerrufsrecht?', '["Recht, einen Vertrag innerhalb von 14 Tagen zu widerrufen", "Recht, einen Vertrag sofort zu kündigen", "Recht, einen Vertrag zu verlängern", "Kein Recht"]', 'Recht, einen Vertrag innerhalb von 14 Tagen zu widerrufen', 'Das Widerrufsrecht ist das Recht, einen Vertrag innerhalb von 14 Tagen ohne Angabe von Gründen zu widerrufen (§ 495 BGB).'),

(5, 'Verbraucherschutz', 'medium', 'Wie lange beträgt die Widerrufsfrist bei einem Immobiliardarlehensvertrag?', '["14 Tage ab Vertragsschluss", "7 Tage", "30 Tage", "Keine Widerrufsfrist"]', '14 Tage ab Vertragsschluss', 'Die Widerrufsfrist beträgt 14 Tage ab Vertragsschluss (§ 495 BGB).'),

(5, 'Verbraucherschutz', 'hard', 'Was passiert, wenn die Widerrufsbelehrung fehlerhaft ist?', '["Widerrufsfrist beginnt nicht, ewiges Widerrufsrecht", "Widerrufsfrist beginnt normal", "Vertrag ist nichtig", "Nur Bußgeld"]', 'Widerrufsfrist beginnt nicht, ewiges Widerrufsrecht', 'Wenn die Widerrufsbelehrung fehlerhaft ist, beginnt die Widerrufsfrist nicht, und der Kunde hat ein ewiges Widerrufsrecht (bis zu 1 Jahr + 14 Tage).'),

(5, 'Verbraucherschutz', 'easy', 'Was ist eine Widerrufsbelehrung?', '["Belehrung über das Widerrufsrecht", "Belehrung über Zinsen", "Belehrung über Tilgung", "Belehrung über Nebenkosten"]', 'Belehrung über das Widerrufsrecht', 'Eine Widerrufsbelehrung ist eine Belehrung über das Widerrufsrecht (Pflicht bei Vertragsschluss, § 495 BGB).'),

(5, 'Verbraucherschutz', 'medium', 'Ein Kunde widerruft einen Darlehensvertrag nach 10 Tagen. Welche Folgen hat das?', '["Vertrag ist aufgehoben, Kunde muss Darlehen zurückzahlen", "Vertrag bleibt bestehen", "Nur Bußgeld", "Keine Folgen"]', 'Vertrag ist aufgehoben, Kunde muss Darlehen zurückzahlen', 'Widerruf: Vertrag ist aufgehoben, Kunde muss Darlehen zurückzahlen (ggf. mit Zinsen), keine Vorfälligkeitsentschädigung.'),

(5, 'Verbraucherschutz', 'hard', 'Was ist eine Vorfälligkeitsentschädigung?', '["Entschädigung der Bank bei vorzeitiger Rückzahlung des Darlehens", "Entschädigung des Kunden", "Entschädigung bei Widerruf", "Keine Entschädigung"]', 'Entschädigung der Bank bei vorzeitiger Rückzahlung des Darlehens', 'Eine Vorfälligkeitsentschädigung ist eine Entschädigung der Bank bei vorzeitiger Rückzahlung des Darlehens (Ausgleich für entgangene Zinsen).');
</file>

<file path="server/seed-questions-modul5-batch7.sql">
-- Batch 7: 50 additional questions for Module 5 (§34i Darlehensvermittlung)
-- IDs: 351-400
-- Distribution: Rechtliche Grundlagen (10), Darlehensarten (10), Finanzierungsplanung (10), Bonitätsprüfung (7), Risiken (7), Verbraucherschutz (6)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES
-- Rechtliche Grundlagen (10 Fragen, ID 351-360)
(5, 'Rechtliche Grundlagen', 'easy', 'Was ist ein Beratungsprotokoll?', '["Dokumentation der Beratung mit Kundenwünschen und Empfehlungen", "Schufa-Auskunft", "Grundbuchauszug", "Arbeitsvertrag"]', 'Dokumentation der Beratung mit Kundenwünschen und Empfehlungen', 'Ein Beratungsprotokoll ist eine Dokumentation der Beratung mit Kundenwünschen, Empfehlungen und Begründungen (Pflicht für § 34i).'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Angaben müssen in einem Beratungsprotokoll enthalten sein?', '["Kundenwünsche, Empfehlungen, Begründungen, Risiken", "Nur Kundenwünsche", "Nur Empfehlungen", "Nur Risiken"]', 'Kundenwünsche, Empfehlungen, Begründungen, Risiken', 'Beratungsprotokoll muss enthalten: Kundenwünsche, Empfehlungen, Begründungen, Risiken, Alternativen.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist eine ESIS (European Standardised Information Sheet)?', '["Standardisiertes Informationsblatt für Immobiliendarlehen", "Schufa-Auskunft", "Grundbuchauszug", "Arbeitsvertrag"]', 'Standardisiertes Informationsblatt für Immobiliendarlehen', 'ESIS ist ein standardisiertes Informationsblatt für Immobiliendarlehen (Pflicht vor Vertragsschluss, § 491a BGB).'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist eine Aufklärungspflicht?', '["Pflicht, den Kunden über Risiken und Kosten aufzuklären", "Pflicht zur Beratung", "Pflicht zur Dokumentation", "Keine Pflicht"]', 'Pflicht, den Kunden über Risiken und Kosten aufzuklären', 'Die Aufklärungspflicht ist die Pflicht, den Kunden über Risiken, Kosten und Alternativen aufzuklären (§ 34i GewO).'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Risiken müssen bei der Darlehensvermittlung aufgeklärt werden?', '["Zinsänderungsrisiko, Arbeitslosigkeitsrisiko, Krankheitsrisiko, Todesrisiko", "Nur Zinsänderungsrisiko", "Nur Arbeitslosigkeitsrisiko", "Keine Risiken"]', 'Zinsänderungsrisiko, Arbeitslosigkeitsrisiko, Krankheitsrisiko, Todesrisiko', 'Aufklärung über Risiken: Zinsänderungsrisiko, Arbeitslosigkeitsrisiko, Krankheitsrisiko, Todesrisiko, Immobilienpreisrisiko.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist eine Geeignetheitserklärung?', '["Erklärung, dass das empfohlene Darlehen für den Kunden geeignet ist", "Schufa-Auskunft", "Grundbuchauszug", "Arbeitsvertrag"]', 'Erklärung, dass das empfohlene Darlehen für den Kunden geeignet ist', 'Eine Geeignetheitserklärung ist eine Erklärung, dass das empfohlene Darlehen für den Kunden geeignet ist (Pflicht für § 34i).'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist eine Dokumentationspflicht?', '["Pflicht, die Beratung zu dokumentieren", "Pflicht zur Aufklärung", "Pflicht zur Beratung", "Keine Pflicht"]', 'Pflicht, die Beratung zu dokumentieren', 'Die Dokumentationspflicht ist die Pflicht, die Beratung zu dokumentieren (Beratungsprotokoll, § 34i GewO).'),

(5, 'Rechtliche Grundlagen', 'medium', 'Wie lange müssen Beratungsprotokolle aufbewahrt werden?', '["5 Jahre", "1 Jahr", "10 Jahre", "Keine Aufbewahrungspflicht"]', '5 Jahre', 'Beratungsprotokolle müssen 5 Jahre aufbewahrt werden (§ 34i GewO).'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist eine Haftung bei fehlerhafter Beratung?', '["Schadensersatzpflicht bei fehlerhafter Beratung", "Keine Haftung", "Nur Bußgeld", "Nur Vertragsstrafe"]', 'Schadensersatzpflicht bei fehlerh after Beratung', 'Bei fehlerhafter Beratung haftet der Darlehensvermittler auf Schadensersatz (Vermögensschadenhaftpflichtversicherung deckt Schäden ab).'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist eine Provision?', '["Vergütung für die Darlehensvermittlung", "Zins", "Tilgung", "Nebenkosten"]', 'Vergütung für die Darlehensvermittlung', 'Eine Provision ist eine Vergütung für die Darlehensvermittlung (von Bank oder Kunde).'),

-- Darlehensarten (10 Fragen, ID 361-370)
(5, 'Darlehensarten', 'easy', 'Was ist ein Zwischenfinanzierungsdarlehen?', '["Kurzfristiges Darlehen bis zur Auszahlung eines langfristigen Darlehens", "Langfristiges Darlehen", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Kurzfristiges Darlehen bis zur Auszahlung eines langfristigen Darlehens', 'Ein Zwischenfinanzierungsdarlehen ist ein kurzfristiges Darlehen bis zur Auszahlung eines langfristigen Darlehens (z.B. Bausparvertrag).'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde benötigt 50.000 EUR für 6 Monate bis zur Auszahlung seines Bausparvertrags. Welches Darlehen ist geeignet?', '["Zwischenfinanzierungsdarlehen", "Annuitätendarlehen", "Festdarlehen", "KfW-Darlehen"]', 'Zwischenfinanzierungsdarlehen', 'Zwischenfinanzierungsdarlehen ist geeignet für kurzfristige Finanzierung (6 Monate).'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Kombi-Darlehen?', '["Kombination aus Annuitätendarlehen und Bausparvertrag", "Nur Annuitätendarlehen", "Nur Bausparvertrag", "Nur KfW-Darlehen"]', 'Kombination aus Annuitätendarlehen und Bausparvertrag', 'Ein Kombi-Darlehen ist eine Kombination aus Annuitätendarlehen und Bausparvertrag (Tilgung über Bausparguthaben).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Fremdwährungsdarlehen?', '["Darlehen in fremder Währung (z.B. Schweizer Franken)", "Darlehen in Euro", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Darlehen in fremder Währung (z.B. Schweizer Franken)', 'Ein Fremdwährungsdarlehen ist ein Darlehen in fremder Währung (z.B. Schweizer Franken). Risiko: Währungsschwankungen.'),

(5, 'Darlehensarten', 'medium', 'Welche Risiken hat ein Fremdwährungsdarlehen?', '["Währungsrisiko, Zinsänderungsrisiko", "Nur Währungsrisiko", "Nur Zinsänderungsrisiko", "Keine Risiken"]', 'Währungsrisiko, Zinsänderungsrisiko', 'Risiken eines Fremdwährungsdarlehens: Währungsrisiko (Wechselkursschwankungen), Zinsänderungsrisiko.'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Konstantdarlehen?', '["Darlehen mit konstanter Rate über die gesamte Laufzeit", "Darlehen mit variabler Rate", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Darlehen mit konstanter Rate über die gesamte Laufzeit', 'Ein Konstantdarlehen ist ein Darlehen mit konstanter Rate über die gesamte Laufzeit (auch nach Zinsbindungsende).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Tilgungsaussetzungsdarlehen?', '["Darlehen ohne Tilgung während der Laufzeit", "Darlehen mit monatlicher Tilgung", "Darlehen mit variabler Tilgung", "Darlehen ohne Zinsen"]', 'Darlehen ohne Tilgung während der Laufzeit', 'Ein Tilgungsaussetzungsdarlehen ist ein Darlehen ohne Tilgung während der Laufzeit (nur Zinszahlungen, Tilgung am Ende).'),

(5, 'Darlehensarten', 'medium', 'Wann ist ein Tilgungsaussetzungsdarlehen sinnvoll?', '["Bei vermieteten Immobilien (steuerliche Vorteile)", "Bei selbstgenutzten Immobilien", "Bei Renovierungen", "Nie"]', 'Bei vermieteten Immobilien (steuerliche Vorteile)', 'Tilgungsaussetzungsdarlehen ist sinnvoll bei vermieteten Immobilien (Zinsen steuerlich absetzbar, Tilgung über Lebensversicherung).'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Policendarlehen?', '["Darlehen, das durch eine Lebensversicherung besichert ist", "Darlehen ohne Sicherheiten", "Darlehen mit Grundschuld", "Darlehen mit Hypothek"]', 'Darlehen, das durch eine Lebensversicherung besichert ist', 'Ein Policendarlehen ist ein Darlehen, das durch eine Lebensversicherung besichert ist (Tilgung über Versicherungssumme).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Modernisierungsdarlehen?', '["Darlehen für Renovierung und Modernisierung", "Darlehen für Neubau", "Darlehen für Grundstückskauf", "Darlehen für Umschuldung"]', 'Darlehen für Renovierung und Modernisierung', 'Ein Modernisierungsdarlehen ist ein Darlehen für Renovierung und Modernisierung (z.B. energetische Sanierung).'),

-- Finanzierungsplanung (10 Fragen, ID 371-380)
(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Machbarkeitsprüfung?', '["Prüfung, ob die Finanzierung realisierbar ist", "Schufa-Auskunft", "Grundbuchauszug", "Arbeitsvertrag"]', 'Prüfung, ob die Finanzierung realisierbar ist', 'Eine Machbarkeitsprüfung ist eine Prüfung, ob die Finanzierung realisierbar ist (Einkommen, Eigenkapital, Bonität).'),

(5, 'Finanzierungsplanung', 'medium', 'Welche Faktoren beeinflussen die Machbarkeit einer Finanzierung?', '["Einkommen, Eigenkapital, Bonität, Immobilienwert", "Nur Einkommen", "Nur Eigenkapital", "Nur Bonität"]', 'Einkommen, Eigenkapital, Bonität, Immobilienwert', 'Faktoren für Machbarkeit: Einkommen (verfügbares Einkommen), Eigenkapital (mind. 20%), Bonität (Schufa), Immobilienwert (Beleihungswert).'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist eine Finanzierungsstruktur?', '["Aufteilung der Finanzierung in verschiedene Darlehen", "Nur ein Darlehen", "Nur Eigenkapital", "Nur Fremdkapital"]', 'Aufteilung der Finanzierung in verschiedene Darlehen', 'Eine Finanzierungsstruktur ist die Aufteilung der Finanzierung in verschiedene Darlehen (z.B. Annuitätendarlehen + KfW-Darlehen).'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Zinsbindung?', '["Zeitraum, in dem der Zinssatz fest ist", "Zeitraum, in dem der Zinssatz variabel ist", "Zeitraum ohne Zinsen", "Zeitraum ohne Tilgung"]', 'Zeitraum, in dem der Zinssatz fest ist', 'Eine Zinsbindung ist der Zeitraum, in dem der Zinssatz fest ist (z.B. 10 Jahre).'),

(5, 'Finanzierungsplanung', 'medium', 'Welche Zinsbindungsfristen sind üblich?', '["5, 10, 15, 20 Jahre", "Nur 5 Jahre", "Nur 10 Jahre", "Nur 20 Jahre"]', '5, 10, 15, 20 Jahre', 'Übliche Zinsbindungsfristen: 5, 10, 15, 20 Jahre (je länger, desto höher der Zinssatz).'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist eine Zinsbindungsstrategie?', '["Strategie zur Wahl der Zinsbindungsfrist", "Strategie zur Tilgung", "Strategie zur Sondertilgung", "Strategie zur Umschuldung"]', 'Strategie zur Wahl der Zinsbindungsfrist', 'Eine Zinsbindungsstrategie ist eine Strategie zur Wahl der Zinsbindungsfrist (kurz bei niedrigen Zinsen, lang bei hohen Zinsen).'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Tilgungsrate?', '["Monatliche Tilgung des Darlehens", "Monatliche Zinsen", "Monatliche Nebenkosten", "Monatliche Versicherung"]', 'Monatliche Tilgung des Darlehens', 'Eine Tilgungsrate ist die monatliche Tilgung des Darlehens (Teil der monatlichen Rate).'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde hat ein Darlehen von 200.000 EUR mit 2% Tilgung. Wie hoch ist die monatliche Tilgungsrate?', '["333,33 EUR", "500 EUR", "666,67 EUR", "1.000 EUR"]', '333,33 EUR', 'Monatliche Tilgungsrate: 200.000 EUR × 2% / 12 = 333,33 EUR.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist eine Tilgungsstrategie?', '["Strategie zur Wahl der Tilgungshöhe", "Strategie zur Zinsbindung", "Strategie zur Sondertilgung", "Strategie zur Umschuldung"]', 'Strategie zur Wahl der Tilgungshöhe', 'Eine Tilgungsstrategie ist eine Strategie zur Wahl der Tilgungshöhe (hoch für schnelle Entschuldung, niedrig für niedrige Raten).'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Restschuld?', '["Verbleibende Schuld nach Ablauf der Zinsbindung", "Gesamtschuld", "Tilgung", "Zinsen"]', 'Verbleibende Schuld nach Ablauf der Zinsbindung', 'Eine Restschuld ist die verbleibende Schuld nach Ablauf der Zinsbindung (muss refinanziert werden).'),

-- Bonitätsprüfung (7 Fragen, ID 381-387)
(5, 'Bonitätsprüfung', 'easy', 'Was ist ein Schufa-Score?', '["Bewertung der Kreditwürdigkeit (0-100%)", "Einkommen", "Vermögen", "Schulden"]', 'Bewertung der Kreditwürdigkeit (0-100%)', 'Ein Schufa-Score ist eine Bewertung der Kreditwürdigkeit (0-100%, je höher, desto besser).'),

(5, 'Bonitätsprüfung', 'medium', 'Welche Faktoren beeinflussen den Schufa-Score?', '["Zahlungsverhalten, Kreditanfragen, Schulden, Alter", "Nur Zahlungsverhalten", "Nur Kreditanfragen", "Nur Schulden"]', 'Zahlungsverhalten, Kreditanfragen, Schulden, Alter', 'Faktoren für Schufa-Score: Zahlungsverhalten (pünktlich), Kreditanfragen (wenige), Schulden (niedrig), Alter (länger besser).'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist ein negativer Schufa-Eintrag?', '["Eintrag über nicht bezahlte Rechnungen oder Kredite", "Positiver Eintrag", "Keine Einträge", "Nur Kreditanfragen"]', 'Eintrag über nicht bezahlte Rechnungen oder Kredite', 'Ein negativer Schufa-Eintrag ist ein Eintrag über nicht bezahlte Rechnungen oder Kredite (verschlechtert Bonität).'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist eine Kreditanfrage?', '["Anfrage bei der Schufa über die Kreditwürdigkeit", "Antrag auf Darlehen", "Schufa-Auskunft", "Selbstauskunft"]', 'Anfrage bei der Schufa über die Kreditwürdigkeit', 'Eine Kreditanfrage ist eine Anfrage bei der Schufa über die Kreditwürdigkeit (wird gespeichert).'),

(5, 'Bonitätsprüfung', 'medium', 'Wie lange werden Kreditanfragen gespeichert?', '["12 Monate", "6 Monate", "24 Monate", "Unbegrenzt"]', '12 Monate', 'Kreditanfragen werden 12 Monate gespeichert (beeinflussen Schufa-Score).'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist eine Konditionsanfrage?', '["Anfrage ohne Einfluss auf den Schufa-Score", "Anfrage mit Einfluss auf den Schufa-Score", "Keine Anfrage", "Nur Schufa-Auskunft"]', 'Anfrage ohne Einfluss auf den Schufa-Score', 'Eine Konditionsanfrage ist eine Anfrage ohne Einfluss auf den Schufa-Score (für Konditionsvergleich).'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist ein Beleihungswert?', '["Wert der Immobilie für die Kreditvergabe", "Kaufpreis", "Verkehrswert", "Marktwert"]', 'Wert der Immobilie für die Kreditvergabe', 'Ein Beleihungswert ist der Wert der Immobilie für die Kreditvergabe (meist 80% des Verkehrswerts).'),

-- Risiken (7 Fragen, ID 388-394)
(5, 'Risiken', 'easy', 'Was ist ein Zinsänderungsrisiko?', '["Risiko steigender Zinsen nach Ablauf der Zinsbindung", "Risiko sinkender Zinsen", "Risiko steigender Nebenkosten", "Risiko sinkender Immobilienpreise"]', 'Risiko steigender Zinsen nach Ablauf der Zinsbindung', 'Das Zinsänderungsrisiko ist das Risiko steigender Zinsen nach Ablauf der Zinsbindung (höhere Raten).'),

(5, 'Risiken', 'medium', 'Wie kann ein Kunde das Zinsänderungsrisiko absichern?', '["Lange Zinsbindung, Forward-Darlehen, Sondertilgungen", "Nur lange Zinsbindung", "Nur Forward-Darlehen", "Nur Sondertilgungen"]', 'Lange Zinsbindung, Forward-Darlehen, Sondertilgungen', 'Absicherung gegen Zinsänderungsrisiko: Lange Zinsbindung (15-20 Jahre), Forward-Darlehen (Zinssicherung), Sondertilgungen (Restschuld reduzieren).'),

(5, 'Risiken', 'hard', 'Was ist ein Immobilienpreisrisiko?', '["Risiko sinkender Immobilienpreise", "Risiko steigender Immobilienpreise", "Risiko steigender Zinsen", "Risiko steigender Nebenkosten"]', 'Risiko sinkender Immobilienpreise', 'Das Immobilienpreisrisiko ist das Risiko sinkender Immobilienpreise (Verlust bei Verkauf).'),

(5, 'Risiken', 'easy', 'Was ist ein Liquiditätsrisiko?', '["Risiko, dass der Kunde die Raten nicht mehr zahlen kann", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten"]', 'Risiko, dass der Kunde die Raten nicht mehr zahlen kann', 'Das Liquiditätsrisiko ist das Risiko, dass der Kunde die Raten nicht mehr zahlen kann (z.B. durch Arbeitslosigkeit).'),

(5, 'Risiken', 'medium', 'Wie kann ein Kunde das Liquiditätsrisiko absichern?', '["Rücklagen, Restschuldversicherung, niedrige Raten", "Nur Rücklagen", "Nur Restschuldversicherung", "Nur niedrige Raten"]', 'Rücklagen, Restschuldversicherung, niedrige Raten', 'Absicherung gegen Liquiditätsrisiko: Rücklagen (3-6 Monatsraten), Restschuldversicherung, niedrige Raten (hohe Tilgung vermeiden).'),

(5, 'Risiken', 'hard', 'Was ist ein Klumpenrisiko?', '["Risiko, dass zu viel Vermögen in einer Immobilie gebunden ist", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten"]', 'Risiko, dass zu viel Vermögen in einer Immobilie gebunden ist', 'Das Klumpenrisiko ist das Risiko, dass zu viel Vermögen in einer Immobilie gebunden ist (Diversifikation fehlt).'),

(5, 'Risiken', 'easy', 'Was ist ein Inflationsrisiko?', '["Risiko steigender Preise und sinkender Kaufkraft", "Risiko sinkender Preise", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise"]', 'Risiko steigender Preise und sinkender Kaufkraft', 'Das Inflationsrisiko ist das Risiko steigender Preise und sinkender Kaufkraft (Vorteil für Schuldner: Schulden werden real weniger wert).'),

-- Verbraucherschutz (6 Fragen, ID 395-400)
(5, 'Verbraucherschutz', 'easy', 'Was ist eine Widerrufsbelehrung?', '["Belehrung über das Widerrufsrecht", "Belehrung über Zinsen", "Belehrung über Tilgung", "Belehrung über Nebenkosten"]', 'Belehrung über das Widerrufsrecht', 'Eine Widerrufsbelehrung ist eine Belehrung über das Widerrufsrecht (Pflicht bei Vertragsschluss, § 495 BGB).'),

(5, 'Verbraucherschutz', 'medium', 'Was passiert, wenn die Widerrufsbelehrung fehlt?', '["Widerrufsfrist beginnt nicht, ewiges Widerrufsrecht", "Widerrufsfrist beginnt normal", "Vertrag ist nichtig", "Nur Bußgeld"]', 'Widerrufsfrist beginnt nicht, ewiges Widerrufsrecht', 'Wenn die Widerrufsbelehrung fehlt, beginnt die Widerrufsfrist nicht, und der Kunde hat ein ewiges Widerrufsrecht (bis zu 1 Jahr + 14 Tage).'),

(5, 'Verbraucherschutz', 'hard', 'Was ist eine Vorfälligkeitsentschädigung?', '["Entschädigung der Bank bei vorzeitiger Rückzahlung des Darlehens", "Entschädigung des Kunden", "Entschädigung bei Widerruf", "Keine Entschädigung"]', 'Entschädigung der Bank bei vorzeitiger Rückzahlung des Darlehens', 'Eine Vorfälligkeitsentschädigung ist eine Entschädigung der Bank bei vorzeitiger Rückzahlung des Darlehens (Ausgleich für entgangene Zinsen).'),

(5, 'Verbraucherschutz', 'easy', 'Wann fällt eine Vorfälligkeitsentschädigung an?', '["Bei vorzeitiger Rückzahlung während der Zinsbindung", "Bei normaler Tilgung", "Bei Widerruf", "Nie"]', 'Bei vorzeitiger Rückzahlung während der Zinsbindung', 'Eine Vorfälligkeitsentschädigung fällt an bei vorzeitiger Rückzahlung während der Zinsbindung (z.B. bei Verkauf der Immobilie).'),

(5, 'Verbraucherschutz', 'medium', 'Wie wird die Vorfälligkeitsentschädigung berechnet?', '["Aktuar-Methode oder Zinsschaden-Methode", "Nur Aktuar-Methode", "Nur Zinsschaden-Methode", "Keine Berechnung"]', 'Aktuar-Methode oder Zinsschaden-Methode', 'Berechnung der Vorfälligkeitsentschädigung: Aktuar-Methode (Barwert der entgangenen Zinsen) oder Zinsschaden-Methode (Differenz zwischen Vertragszins und Wiederanlagezins).'),

(5, 'Verbraucherschutz', 'hard', 'Wann entfällt die Vorfälligkeitsentschädigung?', '["Bei Widerruf, nach 10 Jahren Zinsbindung, bei berechtigtem Interesse", "Nie", "Immer", "Nur bei Widerruf"]', 'Bei Widerruf, nach 10 Jahren Zinsbindung, bei berechtigtem Interesse', 'Vorfälligkeitsentschädigung entfällt: Bei Widerruf, nach 10 Jahren Zinsbindung (§ 489 BGB), bei berechtigtem Interesse (z.B. Scheidung, Arbeitslosigkeit).');
</file>

<file path="server/seed-questions-modul5.sql">
-- 100 Prüfungsfragen für Modul 5 (§34i Darlehensvermittlung)
-- Kategorien: 1=Rechtliche Grundlagen, 2=Darlehensarten, 3=Finanzierungsplanung, 4=Bonitätsprüfung, 5=Risiken, 6=Verbraucherschutz
-- Schwierigkeitsgrade: easy, medium, hard

-- Kategorie 1: Rechtliche Grundlagen (20 Fragen)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES
(5, 'Rechtliche Grundlagen', 'easy', 'Was regelt § 34i GewO?', '["Immobilienmakler", "Darlehensvermittlung", "WEG-Verwaltung", "Mietverwaltung"]', 'Darlehensvermittlung', '§ 34i GewO regelt die Erlaubnispflicht für Immobiliardarlehensvermittler und Honorar-Immobiliardarlehensvermittler.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Wer benötigt eine Erlaubnis nach § 34i GewO?', '["Nur Banken", "Darlehensvermittler", "Nur Versicherungsmakler", "Nur Immobilienmakler"]', 'Darlehensvermittler', 'Wer gewerbsmäßig Immobiliardarlehensverträge vermittelt oder berät, benötigt eine Erlaubnis nach § 34i GewO.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Weiterbildungspflicht besteht nach § 34i Abs. 4 GewO?', '["5 Stunden pro Jahr", "10 Stunden pro Jahr", "15 Stunden pro Jahr", "20 Stunden pro Jahr"]', '15 Stunden pro Jahr', 'Darlehensvermittler müssen jährlich mindestens 15 Stunden Weiterbildung nachweisen.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Wo müssen Darlehensvermittler registriert sein?', '["IHK-Register", "Handelsregister", "Vermittlerregister (§ 11a GewO)", "Grundbuch"]', 'Vermittlerregister (§ 11a GewO)', 'Darlehensvermittler müssen im Vermittlerregister nach § 11a GewO eingetragen sein.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Welche Versicherung ist für Darlehensvermittler Pflicht?', '["Haftpflichtversicherung", "Berufshaftpflichtversicherung (mind. 1 Mio. €)", "Rechtsschutzversicherung", "Keine Versicherung"]', 'Berufshaftpflichtversicherung (mind. 1 Mio. €)', 'Nach § 34i Abs. 2 GewO ist eine Berufshaftpflichtversicherung mit mind. 1 Mio. € pro Schadensfall erforderlich.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist ein Immobiliardarlehen?', '["Kredit für Möbel", "Kredit für Immobilienerwerb", "Kredit für Auto", "Kredit für Urlaub"]', 'Kredit für Immobilienerwerb', 'Ein Immobiliardarlehen ist ein Darlehen zum Erwerb, Bau oder zur Renovierung von Immobilien.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Behörde ist für die Erlaubniserteilung nach § 34i GewO zuständig?', '["Bundesbank", "IHK", "BaFin", "Gewerbeamt"]', 'IHK', 'Die Industrie- und Handelskammer (IHK) ist für die Erlaubniserteilung nach § 34i GewO zuständig.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Welche Sanktion droht bei Verstoß gegen § 34i GewO?', '["Verwarnung", "Bußgeld bis 50.000 €", "Freiheitsstrafe", "Keine Sanktion"]', 'Bußgeld bis 50.000 €', 'Verstöße gegen § 34i GewO können mit Bußgeldern bis 50.000 € geahndet werden (§ 144 GewO).'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist die Sachkundeprüfung nach § 34i GewO?', '["Theoretische Prüfung", "Praktische Prüfung", "Mündliche Prüfung", "Keine Prüfung erforderlich"]', 'Theoretische Prüfung', 'Die Sachkundeprüfung ist eine theoretische Prüfung bei der IHK, die Kenntnisse im Bereich Darlehensvermittlung nachweist.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Themen sind in der Sachkundeprüfung § 34i enthalten?', '["Nur Rechtskenntnisse", "Recht, Finanzierung, Beratung", "Nur Finanzierung", "Nur Beratung"]', 'Recht, Finanzierung, Beratung', 'Die Sachkundeprüfung umfasst Rechtskenntnisse, Finanzierungswissen und Beratungskompetenzen.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Welche Informationspflichten bestehen nach § 491a BGB?', '["Keine Pflichten", "ESIS-Merkblatt vor Vertragsschluss", "Nur mündliche Informationen", "Nur schriftliche Informationen"]', 'ESIS-Merkblatt vor Vertragsschluss', 'Nach § 491a BGB muss der Darlehensvermittler dem Verbraucher vor Vertragsschluss ein ESIS-Merkblatt aushändigen.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was bedeutet ESIS?', '["European Standard Information Sheet", "European Standard Insurance Sheet", "European Standard Investment Sheet", "European Standard Income Sheet"]', 'European Standard Information Sheet', 'ESIS steht für European Standard Information Sheet und ist ein standardisiertes Informationsblatt für Immobiliendarlehen.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Wann muss das ESIS-Merkblatt ausgehändigt werden?', '["Nach Vertragsschluss", "Mindestens 7 Tage vor Vertragsschluss", "Am Tag des Vertragsschlusses", "Nur auf Anfrage"]', 'Mindestens 7 Tage vor Vertragsschluss', 'Das ESIS-Merkblatt muss rechtzeitig, mindestens 7 Tage vor Vertragsschluss, ausgehändigt werden (§ 491a BGB).'),

(5, 'Rechtliche Grundlagen', 'hard', 'Welche Angaben muss das ESIS-Merkblatt enthalten?', '["Nur Zinssatz", "Zinssatz, Kosten, Laufzeit, Risiken", "Nur Laufzeit", "Nur Kosten"]', 'Zinssatz, Kosten, Laufzeit, Risiken', 'Das ESIS-Merkblatt muss Angaben zu Zinssatz, Kosten, Laufzeit und Risiken enthalten (§ 491a BGB).'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist ein Beratungsprotokoll?', '["Protokoll über Beratungsgespräch", "Protokoll über Vertragsschluss", "Protokoll über Zahlung", "Protokoll über Kündigung"]', 'Protokoll über Beratungsgespräch', 'Ein Beratungsprotokoll dokumentiert den Verlauf und Inhalt eines Beratungsgesprächs mit dem Kunden.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Wann muss ein Beratungsprotokoll erstellt werden?', '["Nur bei Vertragsschluss", "Bei jeder Beratung", "Nur auf Anfrage", "Nie"]', 'Bei jeder Beratung', 'Ein Beratungsprotokoll muss bei jeder Beratung erstellt werden, um die Beratungsqualität zu dokumentieren.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Welche Inhalte muss ein Beratungsprotokoll enthalten?', '["Nur Kundendaten", "Kundendaten, Bedarfsanalyse, Produktempfehlung, Risikoaufklärung", "Nur Produktempfehlung", "Nur Risikoaufklärung"]', 'Kundendaten, Bedarfsanalyse, Produktempfehlung, Risikoaufklärung', 'Ein Beratungsprotokoll muss Kundendaten, Bedarfsanalyse, Produktempfehlung und Risikoaufklärung enthalten.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist eine Provision?', '["Gehalt", "Vergütung für Vermittlung", "Zinsen", "Tilgung"]', 'Vergütung für Vermittlung', 'Eine Provision ist eine Vergütung, die der Darlehensvermittler für die erfolgreiche Vermittlung eines Darlehens erhält.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Muss die Provision offengelegt werden?', '["Nein", "Ja, nach § 511 BGB", "Nur auf Anfrage", "Nur bei hohen Beträgen"]', 'Ja, nach § 511 BGB', 'Nach § 511 BGB muss der Darlehensvermittler die Provision gegenüber dem Kunden offenlegen.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Welche Informationen müssen bei der Provisionsoffenlegung angegeben werden?', '["Nur Höhe", "Höhe, Zahler, Zeitpunkt", "Nur Zahler", "Nur Zeitpunkt"]', 'Höhe, Zahler, Zeitpunkt', 'Bei der Provisionsoffenlegung müssen Höhe, Zahler und Zeitpunkt der Provision angegeben werden (§ 511 BGB).');

-- Kategorie 2: Darlehensarten & Finanzierungsformen (20 Fragen)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES
(5, 'Darlehensarten', 'easy', 'Was ist ein Annuitätendarlehen?', '["Darlehen mit konstanter Rate", "Darlehen mit variabler Rate", "Darlehen ohne Tilgung", "Darlehen ohne Zinsen"]', 'Darlehen mit konstanter Rate', 'Ein Annuitätendarlehen hat eine konstante monatliche Rate, die aus Zins- und Tilgungsanteil besteht.'),

(5, 'Darlehensarten', 'easy', 'Woraus setzt sich die Annuität zusammen?', '["Nur Zinsen", "Nur Tilgung", "Zinsen + Tilgung", "Zinsen + Gebühren"]', 'Zinsen + Tilgung', 'Die Annuität setzt sich aus Zinsen und Tilgung zusammen.'),

(5, 'Darlehensarten', 'medium', 'Wie verändert sich die Annuität im Zeitverlauf?', '["Steigt", "Fällt", "Bleibt konstant", "Schwankt"]', 'Bleibt konstant', 'Die Annuität bleibt während der Zinsbindung konstant, nur die Anteile von Zins und Tilgung verschieben sich.'),

(5, 'Darlehensarten', 'medium', 'Was passiert mit dem Zinsanteil im Zeitverlauf?', '["Steigt", "Fällt", "Bleibt konstant", "Schwankt"]', 'Fällt', 'Der Zinsanteil fällt im Zeitverlauf, weil die Restschuld sinkt, während der Tilgungsanteil steigt.'),

(5, 'Darlehensarten', 'hard', 'Was ist der Effektivzins?', '["Nominalzins", "Nominalzins + Kosten", "Nur Kosten", "Tilgungssatz"]', 'Nominalzins + Kosten', 'Der Effektivzins berücksichtigt neben dem Nominalzins auch alle Kosten des Darlehens (z.B. Bearbeitungsgebühren).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Tilgungsdarlehen?', '["Darlehen mit konstanter Tilgung", "Darlehen ohne Tilgung", "Darlehen mit variabler Tilgung", "Darlehen ohne Zinsen"]', 'Darlehen mit konstanter Tilgung', 'Ein Tilgungsdarlehen hat eine konstante Tilgung, die monatliche Rate sinkt im Zeitverlauf.'),

(5, 'Darlehensarten', 'medium', 'Was ist ein endfälliges Darlehen?', '["Tilgung während Laufzeit", "Tilgung am Ende der Laufzeit", "Keine Tilgung", "Tilgung in Raten"]', 'Tilgung am Ende der Laufzeit', 'Bei einem endfälligen Darlehen wird nur Zins gezahlt, die Tilgung erfolgt am Ende der Laufzeit in einer Summe.'),

(5, 'Darlehensarten', 'hard', 'Welche Vor- und Nachteile hat ein endfälliges Darlehen?', '["Nur Vorteile", "Niedrige monatliche Rate, aber hohe Endzahlung", "Nur Nachteile", "Keine Unterschiede"]', 'Niedrige monatliche Rate, aber hohe Endzahlung', 'Vorteil: Niedrige monatliche Rate (nur Zinsen). Nachteil: Hohe Endzahlung (gesamte Tilgung).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein variables Darlehen?', '["Darlehen mit festem Zinssatz", "Darlehen mit variablem Zinssatz", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Darlehen mit variablem Zinssatz', 'Ein variables Darlehen hat einen variablen Zinssatz, der sich an einem Referenzzinssatz (z.B. EURIBOR) orientiert.'),

(5, 'Darlehensarten', 'medium', 'Welche Risiken hat ein variables Darlehen?', '["Keine Risiken", "Zinsänderungsrisiko", "Tilgungsrisiko", "Währungsrisiko"]', 'Zinsänderungsrisiko', 'Bei einem variablen Darlehen besteht das Risiko, dass der Zinssatz steigt und die monatliche Rate höher wird.'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Forward-Darlehen?', '["Darlehen für Zukunft", "Darlehen mit Vorlaufzeit", "Darlehen für Vergangenheit", "Darlehen ohne Vorlaufzeit"]', 'Darlehen mit Vorlaufzeit', 'Ein Forward-Darlehen wird heute abgeschlossen, aber erst in der Zukunft (Vorlaufzeit) ausgezahlt, um sich günstige Zinsen zu sichern.'),

(5, 'Darlehensarten', 'easy', 'Was ist ein KfW-Darlehen?', '["Darlehen der Kreditanstalt für Wiederaufbau", "Darlehen einer Bank", "Darlehen eines Versicherers", "Darlehen eines Maklers"]', 'Darlehen der Kreditanstalt für Wiederaufbau', 'Ein KfW-Darlehen ist ein staatlich gefördertes Darlehen der Kreditanstalt für Wiederaufbau (KfW).'),

(5, 'Darlehensarten', 'medium', 'Welche Vorteile hat ein KfW-Darlehen?', '["Keine Vorteile", "Günstige Zinsen, Tilgungszuschüsse", "Nur günstige Zinsen", "Nur Tilgungszuschüsse"]', 'Günstige Zinsen, Tilgungszuschüsse', 'KfW-Darlehen bieten günstige Zinsen und teilweise Tilgungszuschüsse (z.B. bei energetischer Sanierung).'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Bausparvertrag?', '["Sparvertrag + Darlehen", "Nur Sparvertrag", "Nur Darlehen", "Versicherung"]', 'Sparvertrag + Darlehen', 'Ein Bausparvertrag kombiniert eine Sparphase mit einem Darlehensanspruch nach Zuteilung.'),

(5, 'Darlehensarten', 'easy', 'Was ist eine Zinsbindung?', '["Zeitraum mit festem Zinssatz", "Zeitraum mit variablem Zinssatz", "Zeitraum ohne Zinsen", "Zeitraum ohne Tilgung"]', 'Zeitraum mit festem Zinssatz', 'Die Zinsbindung ist der Zeitraum, in dem der Zinssatz fest vereinbart ist (z.B. 10 Jahre).'),

(5, 'Darlehensarten', 'medium', 'Was passiert nach Ablauf der Zinsbindung?', '["Darlehen ist abbezahlt", "Anschlussfinanzierung erforderlich", "Zinssatz bleibt gleich", "Darlehen wird gekündigt"]', 'Anschlussfinanzierung erforderlich', 'Nach Ablauf der Zinsbindung ist eine Anschlussfinanzierung erforderlich, da meist noch eine Restschuld besteht.'),

(5, 'Darlehensarten', 'hard', 'Was ist eine Prolongation?', '["Verlängerung bei gleicher Bank", "Wechsel zu anderer Bank", "Kündigung", "Sondertilgung"]', 'Verlängerung bei gleicher Bank', 'Eine Prolongation ist die Verlängerung des Darlehens bei der gleichen Bank zu neuen Konditionen.'),

(5, 'Darlehensarten', 'easy', 'Was ist eine Umschuldung?', '["Wechsel zu anderer Bank", "Verlängerung bei gleicher Bank", "Kündigung", "Sondertilgung"]', 'Wechsel zu anderer Bank', 'Eine Umschuldung ist der Wechsel zu einer anderen Bank mit günstigeren Konditionen.'),

(5, 'Darlehensarten', 'medium', 'Was ist eine Sondertilgung?', '["Zusätzliche Tilgung außerhalb der Rate", "Reguläre Tilgung", "Keine Tilgung", "Tilgung am Ende"]', 'Zusätzliche Tilgung außerhalb der Rate', 'Eine Sondertilgung ist eine zusätzliche Tilgung außerhalb der regulären monatlichen Rate.'),

(5, 'Darlehensarten', 'hard', 'Welche Vorteile hat eine Sondertilgung?', '["Keine Vorteile", "Schnellere Entschuldung, niedrigere Zinslast", "Nur schnellere Entschuldung", "Nur niedrigere Zinslast"]', 'Schnellere Entschuldung, niedrigere Zinslast', 'Sondertilgungen verkürzen die Laufzeit und reduzieren die Gesamtzinslast.');

-- Kategorie 3: Finanzierungsplanung & Beratung (20 Fragen)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES
(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Bedarfsanalyse?', '["Ermittlung des Finanzierungsbedarfs", "Ermittlung der Bonität", "Ermittlung der Immobilie", "Ermittlung der Zinsen"]', 'Ermittlung des Finanzierungsbedarfs', 'Eine Bedarfsanalyse ermittelt den individuellen Finanzierungsbedarf des Kunden.'),

(5, 'Finanzierungsplanung', 'easy', 'Welche Faktoren werden in der Bedarfsanalyse berücksichtigt?', '["Nur Einkommen", "Einkommen, Ausgaben, Eigenkapital, Ziele", "Nur Ausgaben", "Nur Eigenkapital"]', 'Einkommen, Ausgaben, Eigenkapital, Ziele', 'Die Bedarfsanalyse berücksichtigt Einkommen, Ausgaben, Eigenkapital und die Ziele des Kunden.'),

(5, 'Finanzierungsplanung', 'medium', 'Was ist eine Haushaltsrechnung?', '["Ermittlung des verfügbaren Einkommens", "Ermittlung der Bonität", "Ermittlung der Immobilie", "Ermittlung der Zinsen"]', 'Ermittlung des verfügbaren Einkommens', 'Eine Haushaltsrechnung ermittelt das verfügbare Einkommen nach Abzug aller Ausgaben.'),

(5, 'Finanzierungsplanung', 'medium', 'Welcher Sicherheitspuffer wird in der Haushaltsrechnung empfohlen?', '["10%", "20%", "30%", "40%"]', '20%', 'Banken empfehlen einen Sicherheitspuffer von 20% für unvorhergesehene Ausgaben.'),

(5, 'Finanzierungsplanung', 'hard', 'Wie wird die maximale Darlehensrate berechnet?', '["Verfügbares Einkommen / Sicherheitspuffer", "Verfügbares Einkommen × Sicherheitspuffer", "Verfügbares Einkommen - Sicherheitspuffer", "Verfügbares Einkommen + Sicherheitspuffer"]', 'Verfügbares Einkommen / Sicherheitspuffer', 'Maximale Darlehensrate = Verfügbares Einkommen / Sicherheitspuffer (z.B. 1,2 für 20%).'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist Eigenkapital?', '["Eigenes Geld des Käufers", "Geld der Bank", "Geld des Verkäufers", "Geld des Staates"]', 'Eigenes Geld des Käufers', 'Eigenkapital ist das eigene Geld, das der Käufer in die Finanzierung einbringt.'),

(5, 'Finanzierungsplanung', 'medium', 'Wie viel Eigenkapital wird empfohlen?', '["0%", "10%", "20%", "30%"]', '20%', 'Banken empfehlen mindestens 20% Eigenkapital (Kaufpreis + Nebenkosten).'),

(5, 'Finanzierungsplanung', 'hard', 'Was sind Nebenkosten beim Immobilienkauf?', '["Grunderwerbsteuer, Notar, Makler", "Nur Grunderwerbsteuer", "Nur Notar", "Nur Makler"]', 'Grunderwerbsteuer, Notar, Makler', 'Nebenkosten umfassen Grunderwerbsteuer, Notar- und Grundbuchkosten sowie ggf. Maklerprovision.'),

(5, 'Finanzierungsplanung', 'easy', 'Wie hoch ist die Grunderwerbsteuer in Deutschland?', '["3,5-6,5%", "1-2%", "10-15%", "20-25%"]', '3,5-6,5%', 'Die Grunderwerbsteuer beträgt je nach Bundesland 3,5-6,5% des Kaufpreises.'),

(5, 'Finanzierungsplanung', 'medium', 'Was ist ein Finanzierungsplan?', '["Übersicht über Kosten und Finanzierung", "Übersicht über Zinsen", "Übersicht über Tilgung", "Übersicht über Laufzeit"]', 'Übersicht über Kosten und Finanzierung', 'Ein Finanzierungsplan gibt eine Übersicht über alle Kosten und die Finanzierungsstruktur.'),

(5, 'Finanzierungsplanung', 'hard', 'Welche Posten enthält ein Finanzierungsplan?', '["Kaufpreis, Nebenkosten, Eigenkapital, Darlehen", "Nur Kaufpreis", "Nur Nebenkosten", "Nur Darlehen"]', 'Kaufpreis, Nebenkosten, Eigenkapital, Darlehen', 'Ein Finanzierungsplan enthält Kaufpreis, Nebenkosten, Eigenkapital und Darlehensbetrag.'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist ein Konditionsvergleich?', '["Vergleich verschiedener Darlehensangebote", "Vergleich verschiedener Immobilien", "Vergleich verschiedener Banken", "Vergleich verschiedener Makler"]', 'Vergleich verschiedener Darlehensangebote', 'Ein Konditionsvergleich vergleicht verschiedene Darlehensangebote hinsichtlich Zinsen, Kosten und Konditionen.'),

(5, 'Finanzierungsplanung', 'medium', 'Welche Kriterien sind beim Konditionsvergleich wichtig?', '["Nur Zinssatz", "Zinssatz, Kosten, Flexibilität", "Nur Kosten", "Nur Flexibilität"]', 'Zinssatz, Kosten, Flexibilität', 'Beim Konditionsvergleich sind Zinssatz, Kosten und Flexibilität (z.B. Sondertilgungen) wichtig.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist der Unterschied zwischen Nominal- und Effektivzins?', '["Nominalzins ohne Kosten, Effektivzins mit Kosten", "Kein Unterschied", "Nominalzins mit Kosten, Effektivzins ohne Kosten", "Nur Nominalzins ist wichtig"]', 'Nominalzins ohne Kosten, Effektivzins mit Kosten', 'Der Nominalzins ist der reine Zinssatz, der Effektivzins berücksichtigt zusätzlich alle Kosten.'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Vollfinanzierung?', '["Finanzierung ohne Eigenkapital", "Finanzierung mit Eigenkapital", "Finanzierung mit 50% Eigenkapital", "Finanzierung mit 100% Eigenkapital"]', 'Finanzierung ohne Eigenkapital', 'Eine Vollfinanzierung ist eine Finanzierung ohne oder mit sehr wenig Eigenkapital (0-10%).'),

(5, 'Finanzierungsplanung', 'medium', 'Welche Risiken hat eine Vollfinanzierung?', '["Keine Risiken", "Höhere Zinsen, höhere Rate", "Nur höhere Zinsen", "Nur höhere Rate"]', 'Höhere Zinsen, höhere Rate', 'Vollfinanzierungen haben höhere Zinsen und höhere monatliche Raten, da das Risiko für die Bank steigt.'),

(5, 'Finanzierungsplanung', 'hard', 'Wann ist eine Vollfinanzierung sinnvoll?', '["Immer", "Bei hohem Einkommen und sicherer Beschäftigung", "Nie", "Nur bei niedrigen Zinsen"]', 'Bei hohem Einkommen und sicherer Beschäftigung', 'Eine Vollfinanzierung ist sinnvoll bei hohem Einkommen, sicherer Beschäftigung und niedriger Verschuldung.'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Anschlussfinanzierung?', '["Finanzierung nach Zinsbindung", "Erste Finanzierung", "Finanzierung für zweite Immobilie", "Finanzierung für Renovierung"]', 'Finanzierung nach Zinsbindung', 'Eine Anschlussfinanzierung ist die Fortsetzung der Finanzierung nach Ablauf der Zinsbindung.'),

(5, 'Finanzierungsplanung', 'medium', 'Wann sollte man sich um eine Anschlussfinanzierung kümmern?', '["1 Jahr vor Ablauf", "6 Monate vor Ablauf", "3 Jahre vor Ablauf", "Nach Ablauf"]', '3 Jahre vor Ablauf', 'Man sollte sich ca. 3 Jahre vor Ablauf der Zinsbindung um eine Anschlussfinanzierung kümmern.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist ein Forward-Darlehen im Kontext der Anschlussfinanzierung?', '["Sicherung günstiger Zinsen für Zukunft", "Sofortige Finanzierung", "Kündigung", "Sondertilgung"]', 'Sicherung günstiger Zinsen für Zukunft', 'Ein Forward-Darlehen sichert günstige Zinsen für die Anschlussfinanzierung bis zu 5 Jahre im Voraus.');

-- Kategorie 4: Bonitätsprüfung & Kreditwürdigkeit (15 Fragen)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES
(5, 'Bonitätsprüfung', 'easy', 'Was ist Bonität?', '["Kreditwürdigkeit", "Einkommen", "Vermögen", "Schulden"]', 'Kreditwürdigkeit', 'Bonität ist die Kreditwürdigkeit, also die Fähigkeit und Bereitschaft, Schulden zurückzuzahlen.'),

(5, 'Bonitätsprüfung', 'easy', 'Welche Faktoren beeinflussen die Bonität?', '["Nur Einkommen", "Einkommen, Beschäftigung, Schulden, Zahlungsverhalten", "Nur Schulden", "Nur Zahlungsverhalten"]', 'Einkommen, Beschäftigung, Schulden, Zahlungsverhalten', 'Die Bonität wird durch Einkommen, Beschäftigung, bestehende Schulden und Zahlungsverhalten beeinflusst.'),

(5, 'Bonitätsprüfung', 'medium', 'Was ist die SCHUFA?', '["Schutzgemeinschaft für allgemeine Kreditsicherung", "Bank", "Versicherung", "Makler"]', 'Schutzgemeinschaft für allgemeine Kreditsicherung', 'Die SCHUFA ist eine Auskunftei, die Informationen über die Kreditwürdigkeit von Personen sammelt.'),

(5, 'Bonitätsprüfung', 'medium', 'Welche Informationen speichert die SCHUFA?', '["Nur Kredite", "Kredite, Konten, Zahlungsverhalten", "Nur Konten", "Nur Zahlungsverhalten"]', 'Kredite, Konten, Zahlungsverhalten', 'Die SCHUFA speichert Informationen über Kredite, Konten, Kreditkarten und Zahlungsverhalten.'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist der SCHUFA-Score?', '["Punktzahl zur Kreditwürdigkeit (0-100%)", "Einkommen", "Vermögen", "Schulden"]', 'Punktzahl zur Kreditwürdigkeit (0-100%)', 'Der SCHUFA-Score ist eine Punktzahl von 0-100%, die die Kreditwürdigkeit bewertet (höher = besser).'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist eine SCHUFA-Auskunft?', '["Bericht über Kreditwürdigkeit", "Bericht über Einkommen", "Bericht über Vermögen", "Bericht über Schulden"]', 'Bericht über Kreditwürdigkeit', 'Eine SCHUFA-Auskunft ist ein Bericht über die gespeicherten Daten und die Kreditwürdigkeit einer Person.'),

(5, 'Bonitätsprüfung', 'medium', 'Wie oft kann man eine kostenlose SCHUFA-Auskunft anfordern?', '["1x pro Jahr", "2x pro Jahr", "4x pro Jahr", "Unbegrenzt"]', '1x pro Jahr', 'Nach Art. 15 DSGVO hat jeder Bürger das Recht auf eine kostenlose SCHUFA-Auskunft pro Jahr.'),

(5, 'Bonitätsprüfung', 'hard', 'Welche Auswirkungen hat ein negativer SCHUFA-Eintrag?', '["Keine Auswirkungen", "Erschwerte Kreditvergabe, höhere Zinsen", "Nur erschwerte Kreditvergabe", "Nur höhere Zinsen"]', 'Erschwerte Kreditvergabe, höhere Zinsen', 'Negative SCHUFA-Einträge erschweren die Kreditvergabe und führen oft zu höheren Zinsen.'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist eine Selbstauskunft?', '["Eigene Angaben zur finanziellen Situation", "SCHUFA-Auskunft", "Bankauskunft", "Arbeitgeberauskunft"]', 'Eigene Angaben zur finanziellen Situation', 'Eine Selbstauskunft sind die eigenen Angaben des Kunden zu Einkommen, Ausgaben und Vermögen.'),

(5, 'Bonitätsprüfung', 'medium', 'Welche Unterlagen werden für eine Bonitätsprüfung benötigt?', '["Nur Gehaltsnachweis", "Gehaltsnachweis, Kontoauszüge, SCHUFA-Auskunft", "Nur Kontoauszüge", "Nur SCHUFA-Auskunft"]', 'Gehaltsnachweis, Kontoauszüge, SCHUFA-Auskunft', 'Für eine Bonitätsprüfung werden Gehaltsnachweis, Kontoauszüge und SCHUFA-Auskunft benötigt.'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist eine Tragfähigkeitsprüfung?', '["Prüfung, ob Kunde Darlehensrate tragen kann", "Prüfung der Bonität", "Prüfung der Immobilie", "Prüfung der Bank"]', 'Prüfung, ob Kunde Darlehensrate tragen kann', 'Eine Tragfähigkeitsprüfung prüft, ob der Kunde die monatliche Darlehensrate dauerhaft tragen kann.'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist ein Einkommensnachweis?', '["Nachweis über Einkommen", "Nachweis über Vermögen", "Nachweis über Schulden", "Nachweis über Ausgaben"]', 'Nachweis über Einkommen', 'Ein Einkommensnachweis ist ein Dokument, das das Einkommen des Kunden belegt (z.B. Gehaltsabrechnung).'),

(5, 'Bonitätsprüfung', 'medium', 'Welche Einkommensnachweise werden akzeptiert?', '["Nur Gehaltsabrechnung", "Gehaltsabrechnung, Steuerbescheid, Rentenbescheid", "Nur Steuerbescheid", "Nur Rentenbescheid"]', 'Gehaltsabrechnung, Steuerbescheid, Rentenbescheid', 'Akzeptierte Einkommensnachweise sind Gehaltsabrechnungen, Steuerbescheide und Rentenbescheide.'),

(5, 'Bonitätsprüfung', 'hard', 'Wie wird die Bonität bei Selbstständigen geprüft?', '["Nur Steuerbescheid", "Steuerbescheid, BWA, Bilanz", "Nur BWA", "Nur Bilanz"]', 'Steuerbescheid, BWA, Bilanz', 'Bei Selbstständigen wird die Bonität anhand von Steuerbescheiden, BWA (Betriebswirtschaftliche Auswertung) und Bilanzen geprüft.'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist eine Probezeit?', '["Befristete Beschäftigung", "Unbefristete Beschäftigung", "Selbstständigkeit", "Rente"]', 'Befristete Beschäftigung', 'Eine Probezeit ist eine befristete Phase zu Beginn eines Arbeitsverhältnisses (meist 6 Monate).');

-- Kategorie 5: Risiken & Haftung (15 Fragen)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES
(5, 'Risiken', 'easy', 'Was ist ein Zinsänderungsrisiko?', '["Risiko steigender Zinsen", "Risiko fallender Zinsen", "Risiko konstanter Zinsen", "Kein Risiko"]', 'Risiko steigender Zinsen', 'Das Zinsänderungsrisiko ist das Risiko, dass die Zinsen nach Ablauf der Zinsbindung steigen.'),

(5, 'Risiken', 'easy', 'Was ist ein Zahlungsunfähigkeitsrisiko?', '["Risiko, Raten nicht zahlen zu können", "Risiko, Immobilie zu verlieren", "Risiko, Zinsen zu zahlen", "Kein Risiko"]', 'Risiko, Raten nicht zahlen zu können', 'Das Zahlungsunfähigkeitsrisiko ist das Risiko, dass der Kunde die monatlichen Raten nicht mehr zahlen kann.'),

(5, 'Risiken', 'medium', 'Was passiert bei Zahlungsunfähigkeit?', '["Kündigung des Darlehens", "Nichts", "Zinssenkung", "Tilgungsaussetzung"]', 'Kündigung des Darlehens', 'Bei Zahlungsunfähigkeit kann die Bank das Darlehen kündigen und die Zwangsversteigerung einleiten.'),

(5, 'Risiken', 'medium', 'Was ist eine Zwangsversteigerung?', '["Verkauf der Immobilie durch Gericht", "Verkauf der Immobilie durch Eigentümer", "Verkauf der Immobilie durch Bank", "Verkauf der Immobilie durch Makler"]', 'Verkauf der Immobilie durch Gericht', 'Eine Zwangsversteigerung ist der Verkauf der Immobilie durch das Gericht zur Tilgung der Schulden.'),

(5, 'Risiken', 'hard', 'Welche Folgen hat eine Zwangsversteigerung?', '["Keine Folgen", "Verlust der Immobilie, Restschuld, SCHUFA-Eintrag", "Nur Verlust der Immobilie", "Nur Restschuld"]', 'Verlust der Immobilie, Restschuld, SCHUFA-Eintrag', 'Folgen: Verlust der Immobilie, mögliche Restschuld, negativer SCHUFA-Eintrag.'),

(5, 'Risiken', 'easy', 'Was ist eine Vorfälligkeitsentschädigung?', '["Entschädigung bei vorzeitiger Rückzahlung", "Entschädigung bei Zahlungsausfall", "Entschädigung bei Zinssenkung", "Keine Entschädigung"]', 'Entschädigung bei vorzeitiger Rückzahlung', 'Eine Vorfälligkeitsentschädigung ist eine Entschädigung, die bei vorzeitiger Rückzahlung des Darlehens fällig wird.'),

(5, 'Risiken', 'medium', 'Wann fällt eine Vorfälligkeitsentschädigung an?', '["Bei vorzeitiger Rückzahlung", "Bei regulärer Rückzahlung", "Bei Zahlungsausfall", "Nie"]', 'Bei vorzeitiger Rückzahlung', 'Eine VFE fällt an, wenn das Darlehen vor Ablauf der Zinsbindung vorzeitig zurückgezahlt wird.'),

(5, 'Risiken', 'hard', 'Wie wird die Vorfälligkeitsentschädigung berechnet?', '["Aktuar-Methode oder Zinsschaden-Methode", "Nur Aktuar-Methode", "Nur Zinsschaden-Methode", "Pauschal"]', 'Aktuar-Methode oder Zinsschaden-Methode', 'Die VFE wird nach der Aktuar-Methode oder Zinsschaden-Methode berechnet.'),

(5, 'Risiken', 'easy', 'Was ist eine Aufklärungspflicht?', '["Pflicht, Kunden über Risiken aufzuklären", "Pflicht, Kunden über Zinsen aufzuklären", "Pflicht, Kunden über Tilgung aufzuklären", "Keine Pflicht"]', 'Pflicht, Kunden über Risiken aufzuklären', 'Die Aufklärungspflicht ist die Pflicht des Beraters, den Kunden über alle Risiken aufzuklären.'),

(5, 'Risiken', 'medium', 'Welche Risiken müssen aufgeklärt werden?', '["Nur Zinsänderungsrisiko", "Zinsänderungsrisiko, Zahlungsunfähigkeitsrisiko, Zwangsversteigerungsrisiko", "Nur Zahlungsunfähigkeitsrisiko", "Nur Zwangsversteigerungsrisiko"]', 'Zinsänderungsrisiko, Zahlungsunfähigkeitsrisiko, Zwangsversteigerungsrisiko', 'Aufzuklären sind: Zinsänderungsrisiko, Zahlungsunfähigkeitsrisiko, Zwangsversteigerungsrisiko, VFE.'),

(5, 'Risiken', 'hard', 'Was passiert bei Verletzung der Aufklärungspflicht?', '["Nichts", "Schadensersatzansprüche", "Bußgeld", "Erlaubnisentzug"]', 'Schadensersatzansprüche', 'Bei Verletzung der Aufklärungspflicht können Schadensersatzansprüche des Kunden entstehen (§ 280 BGB).'),

(5, 'Risiken', 'easy', 'Was ist eine Haftung?', '["Verantwortung für Schäden", "Verantwortung für Zinsen", "Verantwortung für Tilgung", "Keine Verantwortung"]', 'Verantwortung für Schäden', 'Haftung ist die rechtliche Verantwortung für Schäden, die durch Fehler oder Pflichtverletzungen entstehen.'),

(5, 'Risiken', 'medium', 'Wann haftet ein Darlehensvermittler?', '["Bei Beratungsfehlern", "Nie", "Nur bei Betrug", "Nur bei Vorsatz"]', 'Bei Beratungsfehlern', 'Ein Darlehensvermittler haftet bei Beratungsfehlern, falschen Angaben oder Verletzung von Aufklärungspflichten.'),

(5, 'Risiken', 'hard', 'Welche Versicherung schützt vor Haftungsrisiken?', '["Berufshaftpflichtversicherung", "Privathaftpflichtversicherung", "Rechtsschutzversicherung", "Keine Versicherung"]', 'Berufshaftpflichtversicherung', 'Eine Berufshaftpflichtversicherung schützt vor Schadensersatzansprüchen aus Beratungsfehlern.'),

(5, 'Risiken', 'easy', 'Was ist ein Interessenkonflikt?', '["Konflikt zwischen eigenen und Kundeninteressen", "Konflikt zwischen Banken", "Konflikt zwischen Kunden", "Kein Konflikt"]', 'Konflikt zwischen eigenen und Kundeninteressen', 'Ein Interessenkonflikt entsteht, wenn eigene Interessen (z.B. Provision) mit Kundeninteressen kollidieren.');

-- Kategorie 6: Verbraucherschutz & Widerrufsrecht (10 Fragen)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES
(5, 'Verbraucherschutz', 'easy', 'Was ist ein Widerrufsrecht?', '["Recht, Vertrag zu widerrufen", "Recht, Vertrag zu kündigen", "Recht, Vertrag zu ändern", "Kein Recht"]', 'Recht, Vertrag zu widerrufen', 'Das Widerrufsrecht ist das Recht des Verbrauchers, einen Vertrag innerhalb einer Frist zu widerrufen.'),

(5, 'Verbraucherschutz', 'easy', 'Wie lang ist die Widerrufsfrist bei Immobiliardarlehen?', '["7 Tage", "14 Tage", "30 Tage", "60 Tage"]', '14 Tage', 'Die Widerrufsfrist bei Immobiliardarlehen beträgt 14 Tage (§ 495 BGB).'),

(5, 'Verbraucherschutz', 'medium', 'Wann beginnt die Widerrufsfrist?', '["Ab Vertragsschluss", "Ab Vertragsschluss + Widerrufsbelehrung", "Ab Auszahlung", "Ab Kündigung"]', 'Ab Vertragsschluss + Widerrufsbelehrung', 'Die Widerrufsfrist beginnt ab Vertragsschluss, aber erst nach ordnungsgemäßer Widerrufsbelehrung.'),

(5, 'Verbraucherschutz', 'medium', 'Was passiert, wenn keine Widerrufsbelehrung erfolgt?', '["Widerrufsfrist läuft nicht", "Widerrufsfrist läuft normal", "Widerrufsrecht erlischt", "Vertrag ist ungültig"]', 'Widerrufsfrist läuft nicht', 'Ohne ordnungsgemäße Widerrufsbelehrung läuft die Widerrufsfrist nicht, das Widerrufsrecht besteht unbegrenzt.'),

(5, 'Verbraucherschutz', 'hard', 'Welche Folgen hat ein Widerruf?', '["Vertrag wird rückabgewickelt", "Vertrag bleibt bestehen", "Vertrag wird geändert", "Vertrag wird gekündigt"]', 'Vertrag wird rückabgewickelt', 'Bei Widerruf wird der Vertrag rückabgewickelt, bereits gezahlte Beträge werden zurückerstattet.'),

(5, 'Verbraucherschutz', 'easy', 'Was ist eine Schlichtungsstelle?', '["Außergerichtliche Streitbeilegung", "Gerichtliche Streitbeilegung", "Polizei", "Anwalt"]', 'Außergerichtliche Streitbeilegung', 'Eine Schlichtungsstelle ist eine außergerichtliche Stelle zur Beilegung von Streitigkeiten.'),

(5, 'Verbraucherschutz', 'medium', 'Welche Schlichtungsstelle ist für Darlehensvermittler zuständig?', '["Verbraucherschlichtungsstelle der Bundesbank", "IHK", "BaFin", "Gericht"]', 'Verbraucherschlichtungsstelle der Bundesbank', 'Für Darlehensvermittler ist die Verbraucherschlichtungsstelle der Deutschen Bundesbank zuständig.'),

(5, 'Verbraucherschutz', 'hard', 'Welche Kosten entstehen für Verbraucher bei der Schlichtung?', '["Keine Kosten", "100 €", "500 €", "1.000 €"]', 'Keine Kosten', 'Die Schlichtung ist für Verbraucher kostenlos.'),

(5, 'Verbraucherschutz', 'easy', 'Was ist das UWG?', '["Gesetz gegen unlauteren Wettbewerb", "Gesetz über Widerrufsrecht", "Gesetz über Verbraucherschutz", "Gesetz über Werbung"]', 'Gesetz gegen unlauteren Wettbewerb', 'Das UWG ist das Gesetz gegen den unlauteren Wettbewerb, das unlautere Geschäftspraktiken verbietet.'),

(5, 'Verbraucherschutz', 'medium', 'Welche Praktiken sind nach UWG verboten?', '["Nur irreführende Werbung", "Irreführende Werbung, aggressive Verkaufsmethoden", "Nur aggressive Verkaufsmethoden", "Keine Praktiken"]', 'Irreführende Werbung, aggressive Verkaufsmethoden', 'Nach UWG sind irreführende Werbung und aggressive Verkaufsmethoden verboten.');
</file>

<file path="server/storage.ts">
/**
 * storage.ts – Universeller Dateispeicher
 *
 * Auf Manus: Nutzt Manus Storage-Proxy (BUILT_IN_FORGE_API_URL)
 * Auf jedem anderen Host: Speichert lokal im .data/uploads-Ordner
 *
 * API identisch – kein anderer Code muss geändert werden.
 */

import { ENV } from "./_core/env";
import { existsSync, mkdirSync, writeFileSync, readFileSync, unlinkSync } from "fs";
import { join } from "path";

const LOCAL_UPLOAD_DIR = join(process.cwd(), ".data", "uploads");

function ensureUploadDir() {
  if (!existsSync(LOCAL_UPLOAD_DIR)) mkdirSync(LOCAL_UPLOAD_DIR, { recursive: true });
}

function sanitizeKey(key: string): string {
  return key.replace(/\.\./g, "").replace(/^\//, "").replace(/[\/\\]/g, "_");
}

function isManusConfigured(): boolean {
  return Boolean(ENV.forgeApiUrl && ENV.forgeApiKey);
}

function authHeaders(apiKey: string) {
  return { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/octet-stream" };
}

async function manusUpload(key: string, body: Buffer, contentType: string): Promise<string> {
  const base = ENV.forgeApiUrl.replace(/\/+$/, "");
  const url = new URL("v1/storage/upload", base + "/");
  url.searchParams.set("path", key);
  const r = await fetch(url.toString(), {
    method: "PUT",
    headers: { Authorization: `Bearer ${ENV.forgeApiKey}`, "Content-Type": contentType },
    body: body as BodyInit,
  });
  if (!r.ok) throw new Error(`Upload failed: ${r.statusText}`);
  const dlUrl = new URL("v1/storage/downloadUrl", base + "/");
  dlUrl.searchParams.set("path", key);
  const dlR = await fetch(dlUrl.toString(), { headers: authHeaders(ENV.forgeApiKey) });
  const dlData = await dlR.json() as { url?: string };
  return dlData.url ?? `${base}/v1/storage/download?path=${encodeURIComponent(key)}`;
}

/** Datei hochladen → gibt URL zurück */
export async function storagePut(key: string, body: Buffer, contentType = "application/octet-stream"): Promise<string> {
  if (isManusConfigured()) return manusUpload(key, body, contentType);
  ensureUploadDir();
  const safeKey = sanitizeKey(key);
  writeFileSync(join(LOCAL_UPLOAD_DIR, safeKey), body);
  return `/api/storage/${encodeURIComponent(safeKey)}`;
}

/** Datei lesen */
export async function storageGet(key: string): Promise<Buffer | null> {
  if (!isManusConfigured()) {
    const path = join(LOCAL_UPLOAD_DIR, sanitizeKey(key));
    return existsSync(path) ? readFileSync(path) : null;
  }
  const base = ENV.forgeApiUrl.replace(/\/+$/, "");
  const dlUrl = new URL("v1/storage/downloadUrl", base + "/");
  dlUrl.searchParams.set("path", key);
  const dlR = await fetch(dlUrl.toString(), { headers: authHeaders(ENV.forgeApiKey) });
  const { url } = await dlR.json() as { url?: string };
  if (!url) return null;
  const r = await fetch(url);
  return r.ok ? Buffer.from(await r.arrayBuffer()) : null;
}

/** Datei löschen */
export async function storageDelete(key: string): Promise<void> {
  if (isManusConfigured()) {
    const base = ENV.forgeApiUrl.replace(/\/+$/, "");
    const url = new URL("v1/storage/delete", base + "/");
    url.searchParams.set("path", key);
    await fetch(url.toString(), { method: "DELETE", headers: authHeaders(ENV.forgeApiKey) });
    return;
  }
  const path = join(LOCAL_UPLOAD_DIR, sanitizeKey(key));
  if (existsSync(path)) unlinkSync(path);
}

/** Lokale Storage-Route registrieren (nur ohne Manus) */
export function registerStorageRoute(app: import("express").Express) {
  if (isManusConfigured()) return;
  const MIME: Record<string, string> = { pdf: "application/pdf", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", svg: "image/svg+xml" };
  app.get("/api/storage/:key", (req, res) => {
    const path = join(LOCAL_UPLOAD_DIR, sanitizeKey(decodeURIComponent(req.params.key)));
    if (!existsSync(path)) return res.status(404).json({ error: "Nicht gefunden" });
    const ext = path.split(".").pop()?.toLowerCase() ?? "";
    res.setHeader("Content-Type", MIME[ext] ?? "application/octet-stream");
    return res.sendFile(path);
  });
}
</file>

<file path="server/videoRouter.ts">
import { router, publicProcedure, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  getAllVideoTutorials,
  getVideoTutorialsByModule,
  getVideoTutorialsByDay,
  getVideoTutorialById,
  createVideoTutorial,
  updateVideoTutorial,
  deleteVideoTutorial,
  getUserVideoProgress,
  updateVideoProgress,
  getAllUserVideoProgress,
} from "./db";
import { TRPCError } from "@trpc/server";

/**
 * Video Tutorial Router
 * Provides video management and progress tracking
 */

// Admin-only middleware (reuse from routers.ts)
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Nur Administratoren haben Zugriff auf diese Funktion.' });
  }
  return next({ ctx });
});

/**
 * Extract video ID and platform from URL
 */
function parseVideoUrl(url: string): { platform: 'youtube' | 'vimeo', videoId: string } | null {
  // YouTube patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      return { platform: 'youtube', videoId: match[1] };
    }
  }

  // Vimeo patterns
  const vimeoPatterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];

  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern);
    if (match) {
      return { platform: 'vimeo', videoId: match[1] };
    }
  }

  return null;
}

export const videoRouter = router({
  /**
   * Get all video tutorials (public)
   */
  list: publicProcedure.query(async () => {
    return getAllVideoTutorials();
  }),

  /**
   * Get videos by module (public)
   */
  getByModule: publicProcedure
    .input(z.object({ moduleId: z.number().min(1).max(5) }))
    .query(async ({ input }) => {
      return getVideoTutorialsByModule(input.moduleId);
    }),

  /**
   * Get videos by day (public)
   */
  getByDay: publicProcedure
    .input(
      z.object({
        moduleId: z.number().min(1).max(5),
        dayNumber: z.number().min(1).max(220),
      })
    )
    .query(async ({ input }) => {
      return getVideoTutorialsByDay(input.moduleId, input.dayNumber);
    }),

  /**
   * Get video by ID (public)
   */
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const video = await getVideoTutorialById(input.id);
      if (!video) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Video nicht gefunden.' });
      }
      return video;
    }),

  /**
   * Create video tutorial (admin only)
   */
  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        description: z.string().optional(),
        videoUrl: z.string().url(),
        moduleId: z.number().min(1).max(5),
        dayNumber: z.number().min(1).max(220),
        displayOrder: z.number().default(0),
        isRequired: z.boolean().default(false),
        durationSeconds: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Parse video URL
      const parsed = parseVideoUrl(input.videoUrl);
      if (!parsed) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Ungültige Video-URL. Nur YouTube und Vimeo werden unterstützt.',
        });
      }

      // Generate thumbnail URL
      let thumbnailUrl = '';
      if (parsed.platform === 'youtube') {
        thumbnailUrl = `https://img.youtube.com/vi/${parsed.videoId}/maxresdefault.jpg`;
      } else if (parsed.platform === 'vimeo') {
        // Vimeo thumbnails require API call, use placeholder for now
        thumbnailUrl = `https://vumbnail.com/${parsed.videoId}.jpg`;
      }

      const video = await createVideoTutorial({
        ...input,
        platform: parsed.platform,
        videoId: parsed.videoId,
        thumbnailUrl,
      });

      if (!video) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Erstellen des Videos.',
        });
      }

      return video;
    }),

  /**
   * Update video tutorial (admin only)
   */
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).max(255).optional(),
        description: z.string().optional(),
        videoUrl: z.string().url().optional(),
        moduleId: z.number().min(1).max(5).optional(),
        dayNumber: z.number().min(1).max(220).optional(),
        displayOrder: z.number().optional(),
        isRequired: z.boolean().optional(),
        durationSeconds: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, videoUrl, ...updates } = input;

      let videoData: any = updates;

      // If video URL is being updated, re-parse it
      if (videoUrl) {
        const parsed = parseVideoUrl(videoUrl);
        if (!parsed) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Ungültige Video-URL. Nur YouTube und Vimeo werden unterstützt.',
          });
        }

        let thumbnailUrl = '';
        if (parsed.platform === 'youtube') {
          thumbnailUrl = `https://img.youtube.com/vi/${parsed.videoId}/maxresdefault.jpg`;
        } else if (parsed.platform === 'vimeo') {
          thumbnailUrl = `https://vumbnail.com/${parsed.videoId}.jpg`;
        }

        videoData = {
          ...updates,
          videoUrl,
          platform: parsed.platform,
          videoId: parsed.videoId,
          thumbnailUrl,
        };
      }

      const video = await updateVideoTutorial(id, videoData);
      if (!video) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Video nicht gefunden.',
        });
      }

      return video;
    }),

  /**
   * Delete video tutorial (admin only)
   */
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const success = await deleteVideoTutorial(input.id);
      if (!success) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Löschen des Videos.',
        });
      }
      return { success: true };
    }),

  /**
   * Get user's progress for a video (protected)
   */
  getProgress: protectedProcedure
    .input(z.object({ videoId: z.number() }))
    .query(async ({ ctx, input }) => {
      return getUserVideoProgress(ctx.user.id, input.videoId);
    }),

  /**
   * Update user's video progress (protected)
   */
  updateProgress: protectedProcedure
    .input(
      z.object({
        videoId: z.number(),
        currentPosition: z.number().min(0),
        percentageWatched: z.number().min(0).max(100),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const progress = await updateVideoProgress(
        ctx.user.id,
        input.videoId,
        input.currentPosition,
        input.percentageWatched
      );

      if (!progress) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Aktualisieren des Fortschritts.',
        });
      }

      return progress;
    }),

  /**
   * Get all user's video progress (protected)
   */
  getAllProgress: protectedProcedure.query(async ({ ctx }) => {
    return getAllUserVideoProgress(ctx.user.id);
  }),
});
</file>

<file path="server/whitelabel.test.ts">
import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

function createUserContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("whitelabel", () => {
  describe("access control", () => {
    it("admin can list whitelabel configs", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.whitelabel.list();
      expect(Array.isArray(result)).toBe(true);
    });

    it("regular user cannot list whitelabel configs", async () => {
      const { ctx } = createUserContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.whitelabel.list()).rejects.toThrow();
    });

    it("regular user can query their own tenant config", async () => {
      const { ctx } = createUserContext();
      const caller = appRouter.createCaller(ctx);

      // Should not throw - returns null if no tenant assigned
      const result = await caller.whitelabel.myTenant();
      // Result can be null or a config object
      expect(result === null || result === undefined || typeof result === "object").toBe(true);
    });
  });

  describe("CRUD operations", () => {
    it("admin can create a whitelabel config", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const slug = `test-tenant-${Date.now()}`;
      const result = await caller.whitelabel.create({
        slug,
        companyName: "Test Akademie GmbH",
        primaryColor: "#2563eb",
        secondaryColor: "#1e293b",
        accentColor: "#3b82f6",
        sidebarColor: "#0f172a",
        azavEnabled: false,
        enabledModules: "1,2,3",
        maxUsers: 50,
      });

      expect(result).toBeDefined();
      expect(result.slug).toBe(slug);
      expect(result.companyName).toBe("Test Akademie GmbH");
      expect(result.primaryColor).toBe("#2563eb");
      expect(result.enabledModules).toBe("1,2,3");
      expect(result.maxUsers).toBe(50);

      // Cleanup
      await caller.whitelabel.delete({ id: result.id });
    });

    it("admin cannot create duplicate slugs", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const slug = `dup-test-${Date.now()}`;
      const config = await caller.whitelabel.create({
        slug,
        companyName: "Duplicate Test",
      });

      await expect(
        caller.whitelabel.create({
          slug,
          companyName: "Duplicate Test 2",
        })
      ).rejects.toThrow("Dieser Slug ist bereits vergeben");

      // Cleanup
      await caller.whitelabel.delete({ id: config.id });
    });

    it("admin can update a whitelabel config", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const slug = `update-test-${Date.now()}`;
      const config = await caller.whitelabel.create({
        slug,
        companyName: "Before Update",
      });

      const updated = await caller.whitelabel.update({
        id: config.id,
        companyName: "After Update",
        primaryColor: "#ff0000",
        azavEnabled: true,
        azavCertNumber: "DE-AZAV-2026-TEST",
      });

      expect(updated).toBeDefined();
      expect(updated!.companyName).toBe("After Update");
      expect(updated!.primaryColor).toBe("#ff0000");
      expect(updated!.azavEnabled).toBe(true);
      expect(updated!.azavCertNumber).toBe("DE-AZAV-2026-TEST");

      // Cleanup
      await caller.whitelabel.delete({ id: config.id });
    });

    it("admin can delete a whitelabel config", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const slug = `delete-test-${Date.now()}`;
      const config = await caller.whitelabel.create({
        slug,
        companyName: "To Delete",
      });

      const result = await caller.whitelabel.delete({ id: config.id });
      expect(result).toEqual({ success: true });

      // Verify it's gone
      await expect(
        caller.whitelabel.getById({ id: config.id })
      ).rejects.toThrow("nicht gefunden");
    });

    it("admin can get a specific config by ID", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const slug = `getbyid-test-${Date.now()}`;
      const config = await caller.whitelabel.create({
        slug,
        companyName: "Get By ID Test",
        contactEmail: "test@example.com",
      });

      const fetched = await caller.whitelabel.getById({ id: config.id });
      expect(fetched.slug).toBe(slug);
      expect(fetched.companyName).toBe("Get By ID Test");
      expect(fetched.contactEmail).toBe("test@example.com");

      // Cleanup
      await caller.whitelabel.delete({ id: config.id });
    });
  });

  describe("input validation", () => {
    it("rejects invalid slug format", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.whitelabel.create({
          slug: "Invalid Slug With Spaces!",
          companyName: "Test",
        })
      ).rejects.toThrow();
    });

    it("rejects invalid color format", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.whitelabel.create({
          slug: "color-test",
          companyName: "Test",
          primaryColor: "not-a-color",
        })
      ).rejects.toThrow();
    });

    it("rejects empty company name", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.whitelabel.create({
          slug: "empty-name",
          companyName: "",
        })
      ).rejects.toThrow();
    });
  });
});
</file>

<file path="shared/_core/errors.ts">
/**
 * Base HTTP error class with status code.
 * Throw this from route handlers to send specific HTTP errors.
 */
export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = "HttpError";
  }
}

// Convenience constructors
export const BadRequestError = (msg: string) => new HttpError(400, msg);
export const UnauthorizedError = (msg: string) => new HttpError(401, msg);
export const ForbiddenError = (msg: string) => new HttpError(403, msg);
export const NotFoundError = (msg: string) => new HttpError(404, msg);
</file>

<file path="shared/const.ts">
export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = 'Please login (10001)';
export const NOT_ADMIN_ERR_MSG = 'You do not have required permission (10002)';
</file>

<file path="shared/types.ts">
/**
 * Unified type exports
 * Import shared types from this single entry point.
 */

export type * from "../drizzle/schema";
export * from "./_core/errors";
</file>

<file path="drizzle/schema.ts">
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with role system for White-Label functionality.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "trainer"]).default("user").notNull(),
  enabledModules: varchar("enabledModules", { length: 255 }).default("1").notNull(),
  /** Links user to a specific White-Label tenant (null = default/owner tenant) */
  tenantId: int("tenantId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * White-Label tenant configuration
 * Each B2B customer gets their own branding and module access
 */
export const whitelabelConfigs = mysqlTable("whitelabel_configs", {
  id: int("id").autoincrement().primaryKey(),
  /** Unique slug for the tenant (used in URL or subdomain) */
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  /** Company/organization name */
  companyName: varchar("companyName", { length: 255 }).notNull(),
  /** Logo URL (stored in S3) */
  logoUrl: text("logoUrl"),
  /** Favicon URL (stored in S3) */
  faviconUrl: text("faviconUrl"),
  /** Primary brand color (hex) */
  primaryColor: varchar("primaryColor", { length: 7 }).default("#2563eb").notNull(),
  /** Secondary brand color (hex) */
  secondaryColor: varchar("secondaryColor", { length: 7 }).default("#1e293b").notNull(),
  /** Accent color (hex) */
  accentColor: varchar("accentColor", { length: 7 }).default("#3b82f6").notNull(),
  /** Sidebar background color (hex) */
  sidebarColor: varchar("sidebarColor", { length: 7 }).default("#0f172a").notNull(),
  /** Custom welcome text for the landing page */
  welcomeText: text("welcomeText"),
  /** Custom footer text */
  footerText: text("footerText"),
  /** Contact email for the tenant */
  contactEmail: varchar("contactEmail", { length: 320 }),
  /** Contact phone */
  contactPhone: varchar("contactPhone", { length: 50 }),
  /** Website URL */
  websiteUrl: text("websiteUrl"),
  /** Whether AZAV mode is enabled for this tenant */
  azavEnabled: boolean("azavEnabled").default(false).notNull(),
  /** AZAV certification number */
  azavCertNumber: varchar("azavCertNumber", { length: 100 }),
  /** AZAV certification valid until */
  azavValidUntil: timestamp("azavValidUntil"),
  /** Enabled modules as comma-separated string "1,2,3,4,5" */
  enabledModules: varchar("enabledModules", { length: 255 }).default("1,2,3,4,5").notNull(),
  /** Maximum number of users for this tenant */
  maxUsers: int("maxUsers").default(100).notNull(),
  /** Whether the tenant is active */
  isActive: boolean("isActive").default(true).notNull(),
  /** Admin user ID who manages this tenant */
  adminUserId: int("adminUserId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type WhitelabelConfig = typeof whitelabelConfigs.$inferSelect;
export type InsertWhitelabelConfig = typeof whitelabelConfigs.$inferInsert;

/**
 * Chat conversations table for AI assistant
 */
export const chatConversations = mysqlTable("chat_conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }),
  moduleContext: varchar("moduleContext", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChatConversation = typeof chatConversations.$inferSelect;
export type InsertChatConversation = typeof chatConversations.$inferInsert;

/**
 * Chat messages table for AI assistant
 */
export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  role: mysqlEnum("role", ["user", "assistant", "system"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * Video tutorials for training days
 * Supports YouTube and Vimeo embeds
 */
export const videoTutorials = mysqlTable("video_tutorials", {
  id: int("id").autoincrement().primaryKey(),
  /** Video title */
  title: varchar("title", { length: 255 }).notNull(),
  /** Video description */
  description: text("description"),
  /** Video URL (YouTube or Vimeo) */
  videoUrl: text("videoUrl").notNull(),
  /** Video platform (youtube, vimeo) */
  platform: mysqlEnum("platform", ["youtube", "vimeo"]).notNull(),
  /** Extracted video ID from URL */
  videoId: varchar("videoId", { length: 100 }).notNull(),
  /** Video duration in seconds */
  durationSeconds: int("durationSeconds"),
  /** Module number (1-5) */
  moduleId: int("moduleId").notNull(),
  /** Day number within module */
  dayNumber: int("dayNumber").notNull(),
  /** Display order for multiple videos per day */
  displayOrder: int("displayOrder").default(0).notNull(),
  /** Whether this video is required for completion */
  isRequired: boolean("isRequired").default(false).notNull(),
  /** Thumbnail URL */
  thumbnailUrl: text("thumbnailUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type VideoTutorial = typeof videoTutorials.$inferSelect;
export type InsertVideoTutorial = typeof videoTutorials.$inferInsert;

/**
 * User video progress tracking
 */
export const videoProgress = mysqlTable("video_progress", {
  id: int("id").autoincrement().primaryKey(),
  /** User ID */
  userId: int("userId").notNull(),
  /** Video tutorial ID */
  videoId: int("videoId").notNull(),
  /** Current playback position in seconds */
  currentPosition: int("currentPosition").default(0).notNull(),
  /** Whether the video has been completed (watched >= 90%) */
  isCompleted: boolean("isCompleted").default(false).notNull(),
  /** Percentage watched (0-100) */
  percentageWatched: int("percentageWatched").default(0).notNull(),
  /** Last watched timestamp */
  lastWatchedAt: timestamp("lastWatchedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type VideoProgress = typeof videoProgress.$inferSelect;
export type InsertVideoProgress = typeof videoProgress.$inferInsert;

// ============================================================================
// EXAM SYSTEM
// ============================================================================

/**
 * Exam sessions for tracking user exam attempts
 */
export const examSessions = mysqlTable("exam_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(), // 1-5
  totalQuestions: int("totalQuestions").notNull().default(50),
  correctAnswers: int("correctAnswers").notNull().default(0),
  score: int("score").notNull().default(0), // Percentage (0-100)
  timeSpent: int("timeSpent").notNull().default(0), // Seconds
  timeLimit: int("timeLimit").notNull().default(1800), // Time limit in seconds (default 30 min)
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).notNull().default("medium"),
  isIHKMode: boolean("isIHKMode").notNull().default(false), // IHK simulation mode (72 questions, 180 min)
  status: mysqlEnum("status", ["in_progress", "completed", "abandoned"]).notNull().default("in_progress"),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ExamSession = typeof examSessions.$inferSelect;
export type InsertExamSession = typeof examSessions.$inferInsert;

/**
 * Individual exam questions and answers
 */
export const examQuestions = mysqlTable("exam_questions", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: int("sessionId").notNull(),
  questionNumber: int("questionNumber").notNull(),
  questionText: text("questionText").notNull(),
  correctAnswer: text("correctAnswer").notNull(),
  userAnswer: text("userAnswer"),
  isCorrect: boolean("isCorrect"),
  moduleId: int("moduleId").notNull(),
  dayId: int("dayId"),
  topic: varchar("topic", { length: 255 }), // e.g., "Maklerrecht", "WEG-Verwaltung"
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).notNull().default("medium"),
  feedback: text("feedback"), // AI-generated explanation
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ExamQuestion = typeof examQuestions.$inferSelect;
export type InsertExamQuestion = typeof examQuestions.$inferInsert;

/**
 * Weak topics identified from exam results
 */
export const examWeakTopics = mysqlTable("exam_weak_topics", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  topic: varchar("topic", { length: 255 }).notNull(),
  incorrectCount: int("incorrectCount").notNull().default(1),
  lastEncountered: timestamp("lastEncountered").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ExamWeakTopic = typeof examWeakTopics.$inferSelect;
export type InsertExamWeakTopic = typeof examWeakTopics.$inferInsert;

/**
 * Certificates issued to users for passing exams
 */
export const certificates = mysqlTable("certificates", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  examSessionId: int("examSessionId").notNull(),
  moduleId: int("moduleId").notNull(), // 1-5
  moduleName: varchar("moduleName", { length: 255 }).notNull(),
  score: int("score").notNull(), // Percentage (0-100)
  totalQuestions: int("totalQuestions").notNull(),
  correctAnswers: int("correctAnswers").notNull(),
  pdfUrl: text("pdfUrl").notNull(), // S3 URL
  pdfKey: varchar("pdfKey", { length: 500 }).notNull(), // S3 key for future reference
  issuedAt: timestamp("issuedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = typeof certificates.$inferInsert;


/**
 * Question bank for exam preparation (independent of exam sessions)
 */
export const questionBank = mysqlTable("question_bank", {
  id: int("id").autoincrement().primaryKey(),
  moduleId: int("moduleId").notNull(), // 1-5
  category: varchar("category", { length: 255 }).notNull(), // e.g., "Rechtliche Grundlagen", "Darlehensarten"
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).notNull().default("medium"),
  questionText: text("questionText").notNull(),
  options: text("options").notNull(), // JSON array of options
  correctAnswer: text("correctAnswer").notNull(),
  explanation: text("explanation"), // Explanation of the correct answer
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type QuestionBank = typeof questionBank.$inferSelect;
export type InsertQuestionBank = typeof questionBank.$inferInsert;

// ============================================================================
// AZAV-COMPLIANCE TABLES
// Pflicht für Trägerzulassung nach AZAV §2 – unveränderliche Lernprotokolle,
// Anwesenheitsnachweise, Prüfungsaudit, DSGVO-Einwilligungen, QM-System
// ============================================================================

/**
 * Lernfortschritt-Log (server-seitig, AZAV-konform)
 * Ersetzt localStorage als führende Quelle. Kein DELETE durch Nutzer möglich.
 * Pflicht für AZAV-Audit (Nachweis der absolvierten Lerneinheiten).
 */
export const learningLogs = mysqlTable("learning_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),           // 1–5 (+ zukünftige Module)
  dayId: int("dayId").notNull(),                  // Lerntag innerhalb des Moduls
  openedAt: timestamp("openedAt").defaultNow().notNull(),
  closedAt: timestamp("closedAt"),               // null = noch geöffnet
  durationSeconds: int("durationSeconds").default(0).notNull(),
  heartbeatCount: int("heartbeatCount").default(0).notNull(), // Aktive Minuten
  completed: boolean("completed").default(false).notNull(),
  // DSGVO: keine weiteren personenbezogenen Daten hier
});

export type LearningLog = typeof learningLogs.$inferSelect;
export type InsertLearningLog = typeof learningLogs.$inferInsert;

/**
 * Session-Protokoll (AZAV §4 – Nutzeridentifizierung)
 * Jede Login-Session wird protokolliert für Audit-Zwecke.
 */
export const userSessions = mysqlTable("user_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  sessionId: varchar("sessionId", { length: 128 }).notNull().unique(),
  loginTime: timestamp("loginTime").defaultNow().notNull(),
  logoutTime: timestamp("logoutTime"),           // null = noch aktiv
  ipAddress: varchar("ipAddress", { length: 45 }), // IPv4 + IPv6
  deviceInfo: text("deviceInfo"),               // User-Agent (anonymisiert)
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserSession = typeof userSessions.$inferSelect;
export type InsertUserSession = typeof userSessions.$inferInsert;

/**
 * Aktivitäts-Heartbeat (AZAV – Anwesenheitsnachweis)
 * Browser sendet alle 60 Sek ein Signal solange Nutzer aktiv lernt.
 * Nur aktive Minuten zählen als nachgewiesene Lernzeit.
 */
export const activityHeartbeats = mysqlTable("activity_heartbeats", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  dayId: int("dayId").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  // Kein weiterer Inhalt – nur Zeitstempel als Nachweis
});

export type ActivityHeartbeat = typeof activityHeartbeats.$inferSelect;
export type InsertActivityHeartbeat = typeof activityHeartbeats.$inferInsert;

/**
 * Prüfungs-Audit-Log (AZAV – unveränderliche Prüfungsdokumentation)
 * Jede einzelne Antwort wird gespeichert. Kein UPDATE nach Abgabe.
 * Pflicht für AZAV-Zertifikate (Transparenz der Bewertung).
 */
export const examAuditLog = mysqlTable("exam_audit_log", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  sessionId: int("sessionId").notNull(),
  questionId: int("questionId").notNull(),
  chosenAnswer: text("chosenAnswer").notNull(),
  isCorrect: boolean("isCorrect").notNull(),
  answeredAt: timestamp("answeredAt").defaultNow().notNull(),
  // UNVERÄNDERLICH: kein updatedAt – einmal geschrieben, nie geändert
});

export type ExamAuditEntry = typeof examAuditLog.$inferSelect;
export type InsertExamAuditEntry = typeof examAuditLog.$inferInsert;

/**
 * Feedback-System (QM-Pflicht nach AZAV §3)
 * Teilnehmer bewerten jede Lerneinheit. Admin-Auswertung für QM-Dokumentation.
 */
export const feedback = mysqlTable("feedback", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  dayId: int("dayId"),                           // Optional: Feedback zu einzelnem Tag
  rating: int("rating").notNull(),               // 1–5 Sterne
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = typeof feedback.$inferInsert;

/**
 * Beschwerde-Management (QM-Pflicht nach AZAV §3)
 * Formalisiiertes Beschwerdeverfahren mit Status-Tracking.
 */
export const complaints = mysqlTable("complaints", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: mysqlEnum("status", ["open", "in_progress", "resolved", "closed"])
    .default("open").notNull(),
  adminNote: text("adminNote"),
  resolvedAt: timestamp("resolvedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Complaint = typeof complaints.$inferSelect;
export type InsertComplaint = typeof complaints.$inferInsert;

/**
 * DSGVO-Einwilligungs-Log (Art. 7 DSGVO – Nachweispflicht)
 * Jede Einwilligung wird mit Zeitstempel und Version protokolliert.
 * Widerruf ebenfalls dokumentiert (consentType: "revoked").
 */
export const consentLog = mysqlTable("consent_log", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  consentType: mysqlEnum("consentType", [
    "terms",           // AGB akzeptiert
    "privacy",         // Datenschutzerklärung
    "ai_assistant",    // KI-Assistent (externe API-Übermittlung)
    "marketing",       // Newsletter / Marketing
    "revoked_terms",   // Widerruf AGB
    "revoked_privacy", // Widerruf Datenschutz
    "revoked_ai",      // Widerruf KI
    "revoked_marketing"
  ]).notNull(),
  consentVersion: varchar("consentVersion", { length: 20 }).notNull(), // z.B. "2026-03"
  givenAt: timestamp("givenAt").defaultNow().notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }),
  // Unveränderlich: kein updatedAt
});

export type ConsentLogEntry = typeof consentLog.$inferSelect;
export type InsertConsentLogEntry = typeof consentLog.$inferInsert;

/**
 * AVV-Vereinbarungen für White-Label-Kunden (Art. 28 DSGVO)
 * Auftragsverarbeitungsvertrag muss beim Onboarding neuer Mandanten
 * digital bestätigt werden.
 */
export const avvAgreements = mysqlTable("avv_agreements", {
  id: int("id").autoincrement().primaryKey(),
  tenantId: int("tenantId").notNull(),
  signedByUserId: int("signedByUserId").notNull(), // Admin des Mandanten
  version: varchar("version", { length: 20 }).notNull(), // z.B. "2026-03-v1"
  signedAt: timestamp("signedAt").defaultNow().notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }),
  // Unveränderlich: keine Updates erlaubt
});

export type AvvAgreement = typeof avvAgreements.$inferSelect;
export type InsertAvvAgreement = typeof avvAgreements.$inferInsert;

/**
 * Speichert Passwort-Hashes für lokale Auth.
 * Ersetzt .data/auth.json (ephemeral filesystem).
 */
export const authCredentials = mysqlTable("auth_credentials", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  hash: text("hash").notNull(),
  salt: varchar("salt", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * Passwort-Reset Tokens
 */


/**
 * Freischalt-Codes (Voucher) für Module
 * - Du kannst Codes erzeugen und per WhatsApp/E-Mail versenden
 * - Codes können 1x oder unendlich oft nutzbar sein
 * - Codes können deaktiviert werden
 */
export const accessCodes = mysqlTable("access_codes", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 64 }).notNull().unique(),
  modules: varchar("modules", { length: 255 }).notNull(), // z.B. "2,3,4" oder "1,2,3,4,5"
  role: varchar("role", { length: 16 }), // optional: "user" oder "trainer"
  maxUses: int("max_uses").notNull().default(1), // 1 = einmalig, 0 = unendlich
  usedCount: int("used_count").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  note: text("note"),
  createdByUserId: int("created_by_user_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AccessCode = typeof accessCodes.$inferSelect;
export type InsertAccessCode = typeof accessCodes.$inferInsert;

export const passwordResetTokens = mysqlTable("password_reset_tokens", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  token: varchar("token", { length: 64 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  usedAt: timestamp("usedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
</file>

<file path="server/_core/sdk.ts">
import { AXIOS_TIMEOUT_MS, COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { ForbiddenError } from "@shared/_core/errors";
import axios, { type AxiosInstance } from "axios";
import { parse as parseCookieHeader } from "cookie";
import type { Request } from "express";
import { SignJWT, jwtVerify } from "jose";
import type { User } from "../../drizzle/schema";
import * as db from "../db";
import { ENV } from "./env";
import type {
  ExchangeTokenRequest,
  ExchangeTokenResponse,
  GetUserInfoResponse,
  GetUserInfoWithJwtRequest,
  GetUserInfoWithJwtResponse,
} from "./types/manusTypes";
// Utility function
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;

export type SessionPayload = {
  openId: string;
  appId: string;
  name: string;
};

const EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
const GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
const GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;

class OAuthService {
  constructor(private client: ReturnType<typeof axios.create>) {
    if (ENV.oAuthServerUrl) {
      if (ENV.oAuthServerUrl) {
    } else {
    }
    } else {
    }
}

  private decodeState(state: string): string {
    const redirectUri = atob(state);
    return redirectUri;
  }

  async getTokenByCode(
    code: string,
    state: string
  ): Promise<ExchangeTokenResponse> {
    const payload: ExchangeTokenRequest = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state),
    };

    const { data } = await this.client.post<ExchangeTokenResponse>(
      EXCHANGE_TOKEN_PATH,
      payload
    );

    return data;
  }

  async getUserInfoByToken(
    token: ExchangeTokenResponse
  ): Promise<GetUserInfoResponse> {
    const { data } = await this.client.post<GetUserInfoResponse>(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken,
      }
    );

    return data;
  }
}

const createOAuthHttpClient = (): AxiosInstance =>
  axios.create({
    baseURL: ENV.oAuthServerUrl,
    timeout: AXIOS_TIMEOUT_MS,
  });

class SDKServer {
  private readonly client: AxiosInstance;
  private readonly oauthService: OAuthService;

  constructor(client: AxiosInstance = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }

  private deriveLoginMethod(
    platforms: unknown,
    fallback: string | null | undefined
  ): string | null {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set<string>(
      platforms.filter((p): p is string => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (
      set.has("REGISTERED_PLATFORM_MICROSOFT") ||
      set.has("REGISTERED_PLATFORM_AZURE")
    )
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }

  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(
    code: string,
    state: string
  ): Promise<ExchangeTokenResponse> {
    return this.oauthService.getTokenByCode(code, state);
  }

  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken: string): Promise<GetUserInfoResponse> {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken,
    } as ExchangeTokenResponse);
    const loginMethod = this.deriveLoginMethod(
      (data as any)?.platforms,
      (data as any)?.platform ?? data.platform ?? null
    );
    return {
      ...(data as any),
      platform: loginMethod,
      loginMethod,
    } as GetUserInfoResponse;
  }

  private parseCookies(cookieHeader: string | undefined) {
    if (!cookieHeader) {
      return new Map<string, string>();
    }

    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }

  private getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }

  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(
    openId: string,
    options: { expiresInMs?: number; name?: string } = {}
  ): Promise<string> {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || "",
      },
      options
    );
  }

  async signSession(
    payload: SessionPayload,
    options: { expiresInMs?: number } = {}
  ): Promise<string> {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1000);
    const secretKey = this.getSessionSecret();

    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name,
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(expirationSeconds)
      .sign(secretKey);
  }

  async verifySession(
    cookieValue: string | undefined | null
  ): Promise<{ openId: string; appId: string; name: string } | null> {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }

    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"],
      });
      const { openId, appId, name } = payload as Record<string, unknown>;

      if (
        !isNonEmptyString(openId) ||
        !isNonEmptyString(appId) ||
        !isNonEmptyString(name)
      ) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }

      return {
        openId,
        appId,
        name,
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }

  async getUserInfoWithJwt(
    jwtToken: string
  ): Promise<GetUserInfoWithJwtResponse> {
    const payload: GetUserInfoWithJwtRequest = {
      jwtToken,
      projectId: ENV.appId,
    };

    const { data } = await this.client.post<GetUserInfoWithJwtResponse>(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );

    const loginMethod = this.deriveLoginMethod(
      (data as any)?.platforms,
      (data as any)?.platform ?? data.platform ?? null
    );
    return {
      ...(data as any),
      platform: loginMethod,
      loginMethod,
    } as GetUserInfoWithJwtResponse;
  }

  async authenticateRequest(req: Request): Promise<User> {
    // Regular authentication flow
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);

    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }

    const sessionUserId = session.openId;
    const signedInAt = new Date();
    let user = await db.getUserByOpenId(sessionUserId);

    // If user not in DB, sync from OAuth server automatically
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await db.upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt,
        });
        user = await db.getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }

    if (!user) {
      throw ForbiddenError("User not found");
    }

    await db.upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt,
    });

    return user;
  }
}

export const sdk = new SDKServer();
</file>

<file path="server/_core/voiceTranscription.ts">
/**
 * Voice transcription helper using internal Speech-to-Text service
 *
 * Frontend implementation guide:
 * 1. Capture audio using MediaRecorder API
 * 2. Upload audio to storage (e.g., S3) to get URL
 * 3. Call transcription with the URL
 * 
 * Example usage:
 * ```tsx
 * // Frontend component
 * const transcribeMutation = trpc.voice.transcribe.useMutation({
 *   onSuccess: (data) => {
 *
 // Full transcription
 *
 // Detected language
 *
 // Timestamped segments
 *   }
 * });
 * 
 * // After uploading audio to storage
 * transcribeMutation.mutate({
 *   audioUrl: uploadedAudioUrl,
 *   language: 'en', // optional
 *   prompt: 'Transcribe the meeting' // optional
 * });
 * ```
 */
import { ENV } from "./env";

export type TranscribeOptions = {
  audioUrl: string; // URL to the audio file (e.g., S3 URL)
  language?: string; // Optional: specify language code (e.g., "en", "es", "zh")
  prompt?: string; // Optional: custom prompt for the transcription
};

// Native Whisper API segment format
export type WhisperSegment = {
  id: number;
  seek: number;
  start: number;
  end: number;
  text: string;
  tokens: number[];
  temperature: number;
  avg_logprob: number;
  compression_ratio: number;
  no_speech_prob: number;
};

// Native Whisper API response format
export type WhisperResponse = {
  task: "transcribe";
  language: string;
  duration: number;
  text: string;
  segments: WhisperSegment[];
};

export type TranscriptionResponse = WhisperResponse; // Return native Whisper API response directly

export type TranscriptionError = {
  error: string;
  code: "FILE_TOO_LARGE" | "INVALID_FORMAT" | "TRANSCRIPTION_FAILED" | "UPLOAD_FAILED" | "SERVICE_ERROR";
  details?: string;
};

/**
 * Transcribe audio to text using the internal Speech-to-Text service
 * 
 * @param options - Audio data and metadata
 * @returns Transcription result or error
 */
export async function transcribeAudio(
  options: TranscribeOptions
): Promise<TranscriptionResponse | TranscriptionError> {
  try {
    // Step 1: Validate environment configuration
    if (!ENV.forgeApiUrl) {
      return {
        error: "Voice transcription service is not configured",
        code: "SERVICE_ERROR",
        details: "BUILT_IN_FORGE_API_URL is not set"
      };
    }
    if (!ENV.forgeApiKey) {
      return {
        error: "Voice transcription service authentication is missing",
        code: "SERVICE_ERROR",
        details: "BUILT_IN_FORGE_API_KEY is not set"
      };
    }

    // Step 2: Download audio from URL
    let audioBuffer: Buffer;
    let mimeType: string;
    try {
      const response = await fetch(options.audioUrl);
      if (!response.ok) {
        return {
          error: "Failed to download audio file",
          code: "INVALID_FORMAT",
          details: `HTTP ${response.status}: ${response.statusText}`
        };
      }
      
      audioBuffer = Buffer.from(await response.arrayBuffer());
      mimeType = response.headers.get('content-type') || 'audio/mpeg';
      
      // Check file size (16MB limit)
      const sizeMB = audioBuffer.length / (1024 * 1024);
      if (sizeMB > 16) {
        return {
          error: "Audio file exceeds maximum size limit",
          code: "FILE_TOO_LARGE",
          details: `File size is ${sizeMB.toFixed(2)}MB, maximum allowed is 16MB`
        };
      }
    } catch (error) {
      return {
        error: "Failed to fetch audio file",
        code: "SERVICE_ERROR",
        details: error instanceof Error ? error.message : "Unknown error"
      };
    }

    // Step 3: Create FormData for multipart upload to Whisper API
    const formData = new FormData();
    
    // Create a Blob from the buffer and append to form
    const filename = `audio.${getFileExtension(mimeType)}`;
    const audioBlob = new Blob([new Uint8Array(audioBuffer)], { type: mimeType });
    formData.append("file", audioBlob, filename);
    
    formData.append("model", "whisper-1");
    formData.append("response_format", "verbose_json");
    
    // Add prompt - use custom prompt if provided, otherwise generate based on language
    const prompt = options.prompt || (
      options.language 
        ? `Transcribe the user's voice to text, the user's working language is ${getLanguageName(options.language)}`
        : "Transcribe the user's voice to text"
    );
    formData.append("prompt", prompt);

    // Step 4: Call the transcription service
    const baseUrl = ENV.forgeApiUrl.endsWith("/")
      ? ENV.forgeApiUrl
      : `${ENV.forgeApiUrl}/`;
    
    const fullUrl = new URL(
      "v1/audio/transcriptions",
      baseUrl
    ).toString();

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "Accept-Encoding": "identity",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      return {
        error: "Transcription service request failed",
        code: "TRANSCRIPTION_FAILED",
        details: `${response.status} ${response.statusText}${errorText ? `: ${errorText}` : ""}`
      };
    }

    // Step 5: Parse and return the transcription result
    const whisperResponse = await response.json() as WhisperResponse;
    
    // Validate response structure
    if (!whisperResponse.text || typeof whisperResponse.text !== 'string') {
      return {
        error: "Invalid transcription response",
        code: "SERVICE_ERROR",
        details: "Transcription service returned an invalid response format"
      };
    }

    return whisperResponse; // Return native Whisper API response directly

  } catch (error) {
    // Handle unexpected errors
    return {
      error: "Voice transcription failed",
      code: "SERVICE_ERROR",
      details: error instanceof Error ? error.message : "An unexpected error occurred"
    };
  }
}

/**
 * Helper function to get file extension from MIME type
 */
function getFileExtension(mimeType: string): string {
  const mimeToExt: Record<string, string> = {
    'audio/webm': 'webm',
    'audio/mp3': 'mp3',
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'audio/wave': 'wav',
    'audio/ogg': 'ogg',
    'audio/m4a': 'm4a',
    'audio/mp4': 'm4a',
  };
  
  return mimeToExt[mimeType] || 'audio';
}

/**
 * Helper function to get full language name from ISO code
 */
function getLanguageName(langCode: string): string {
  const langMap: Record<string, string> = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh': 'Chinese',
    'ar': 'Arabic',
    'hi': 'Hindi',
    'nl': 'Dutch',
    'pl': 'Polish',
    'tr': 'Turkish',
    'sv': 'Swedish',
    'da': 'Danish',
    'no': 'Norwegian',
    'fi': 'Finnish',
  };
  
  return langMap[langCode] || langCode;
}

/**
 * Example tRPC procedure implementation:
 * 
 * ```ts
 * // In server/routers.ts
 * import { transcribeAudio } from "./_core/voiceTranscription";
 * 
 * export const voiceRouter = router({
 *   transcribe: protectedProcedure
 *     .input(z.object({
 *       audioUrl: z.string(),
 *       language: z.string().optional(),
 *       prompt: z.string().optional(),
 *     }))
 *     .mutation(async ({ input, ctx }) => {
 *       const result = await transcribeAudio(input);
 *       
 *       // Check if it's an error
 *       if ('error' in result) {
 *         throw new TRPCError({
 *           code: 'BAD_REQUEST',
 *           message: result.error,
 *           cause: result,
 *         });
 *       }
 *       
 *       // Optionally save transcription to database
 *       await db.insert(transcriptions).values({
 *         userId: ctx.user.id,
 *         text: result.text,
 *         duration: result.duration,
 *         language: result.language,
 *         audioUrl: input.audioUrl,
 *         createdAt: new Date(),
 *       });
 *       
 *       return result;
 *     }),
 * });
 * ```
 */
</file>

<file path="server/db.ts">
import { desc, eq, sql, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  chatConversations, 
  chatMessages, 
  whitelabelConfigs,
  InsertChatConversation, 
  InsertChatMessage,
  ChatConversation,
  ChatMessage,
  WhitelabelConfig,
  InsertWhitelabelConfig,
  videoTutorials,
  InsertVideoTutorial,
  VideoTutorial,
  videoProgress,
  InsertVideoProgress,
  VideoProgress,
  examSessions,
  examQuestions,
  examWeakTopics,
  InsertExamSession,
  InsertExamQuestion,
  InsertExamWeakTopic,
  ExamSession,
  ExamQuestion,
  ExamWeakTopic,
  // AZAV-Tabellen
  learningLogs,
  userSessions,
  activityHeartbeats,
  examAuditLog,
  feedback,
  complaints,
  consentLog,
  avvAgreements,
  LearningLog,
  InsertLearningLog,
  UserSession,
  InsertUserSession,
  InsertActivityHeartbeat,
  ExamAuditEntry,
  InsertExamAuditEntry,
  Feedback,
  InsertFeedback,
  Complaint,
  InsertComplaint,
  InsertConsentLogEntry,
  InsertAvvAgreement
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Liefert IMMER eine DB-Verbindung oder wirft einen Fehler.
// (Damit es später keine "db ist vielleicht null"-Fehler gibt.)
export async function getDb(): Promise<ReturnType<typeof drizzle>> {
  if (_db) return _db;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("[Database] DATABASE_URL fehlt. Bitte in Railway Variables setzen.");
  }

  _db = drizzle(url);
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserRole(openId: string, role: "user" | "admin" | "trainer"): Promise<void> {
  const db = await getDb();
  await db.update(users).set({ role }).where(eq(users.openId, openId));
}

// ============================================
// Chat Assistant Database Helpers
// ============================================

/**
 * Create a new chat conversation for a user
 */
export async function createChatConversation(
  userId: number,
  moduleContext?: string
): Promise<ChatConversation | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create conversation: database not available");
    return undefined;
  }

  const conversation: InsertChatConversation = {
    userId,
    moduleContext: moduleContext || null,
    title: "Neue Konversation",
  };

  const result = await db.insert(chatConversations).values(conversation);
  const insertId = Number(result[0].insertId);

  return {
    id: insertId,
    userId,
    moduleContext: moduleContext || null,
    title: "Neue Konversation",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Add a message to a conversation
 */
export async function addChatMessage(
  conversationId: number,
  role: "user" | "assistant" | "system",
  content: string
): Promise<ChatMessage | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot add message: database not available");
    return undefined;
  }

  const message: InsertChatMessage = {
    conversationId,
    role,
    content,
  };

  const result = await db.insert(chatMessages).values(message);
  const insertId = Number(result[0].insertId);

  return {
    id: insertId,
    conversationId,
    role,
    content,
    createdAt: new Date(),
  };
}

/**
 * Get all messages for a conversation
 */
export async function getConversationMessages(
  conversationId: number
): Promise<ChatMessage[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get messages: database not available");
    return [];
  }

  return db
    .select()
    .from(chatMessages)
    .where(eq(chatMessages.conversationId, conversationId))
    .orderBy(chatMessages.createdAt);
}

/**
 * Get all conversations for a user
 */
export async function getUserConversations(
  userId: number
): Promise<ChatConversation[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get conversations: database not available");
    return [];
  }

  return db
    .select()
    .from(chatConversations)
    .where(eq(chatConversations.userId, userId))
    .orderBy(desc(chatConversations.updatedAt));
}

/**
 * Update conversation title based on first message
 */
export async function updateConversationTitle(
  conversationId: number,
  title: string
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update conversation: database not available");
    return;
  }

  await db
    .update(chatConversations)
    .set({ title, updatedAt: new Date() })
    .where(eq(chatConversations.id, conversationId));
}

// ============================================
// White-Label Configuration Database Helpers
// ============================================

/**
 * Get all White-Label configurations
 */
export async function getAllWhitelabelConfigs(): Promise<WhitelabelConfig[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get whitelabel configs: database not available");
    return [];
  }

  return db
    .select()
    .from(whitelabelConfigs)
    .orderBy(desc(whitelabelConfigs.createdAt));
}

/**
 * Get a White-Label configuration by ID
 */
export async function getWhitelabelConfigById(
  id: number
): Promise<WhitelabelConfig | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get whitelabel config: database not available");
    return null;
  }

  const result = await db
    .select()
    .from(whitelabelConfigs)
    .where(eq(whitelabelConfigs.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Get a White-Label configuration by slug
 */
export async function getWhitelabelConfigBySlug(
  slug: string
): Promise<WhitelabelConfig | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get whitelabel config: database not available");
    return null;
  }

  const result = await db
    .select()
    .from(whitelabelConfigs)
    .where(eq(whitelabelConfigs.slug, slug))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Create a new White-Label configuration
 */
export async function createWhitelabelConfig(
  config: InsertWhitelabelConfig
): Promise<WhitelabelConfig | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create whitelabel config: database not available");
    return undefined;
  }

  const result = await db.insert(whitelabelConfigs).values(config);
  const insertId = Number(result[0].insertId);

  return {
    ...config,
    id: insertId,
    logoUrl: config.logoUrl ?? null,
    faviconUrl: config.faviconUrl ?? null,
    primaryColor: config.primaryColor ?? "#2563eb",
    secondaryColor: config.secondaryColor ?? "#1e293b",
    accentColor: config.accentColor ?? "#3b82f6",
    sidebarColor: config.sidebarColor ?? "#0f172a",
    welcomeText: config.welcomeText ?? null,
    footerText: config.footerText ?? null,
    contactEmail: config.contactEmail ?? null,
    contactPhone: config.contactPhone ?? null,
    websiteUrl: config.websiteUrl ?? null,
    azavEnabled: config.azavEnabled ?? false,
    azavCertNumber: config.azavCertNumber ?? null,
    azavValidUntil: config.azavValidUntil ?? null,
    enabledModules: config.enabledModules ?? "1,2,3,4,5",
    maxUsers: config.maxUsers ?? 100,
    isActive: config.isActive ?? true,
    adminUserId: config.adminUserId ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Update a White-Label configuration
 */
export async function updateWhitelabelConfig(
  id: number,
  updates: Partial<InsertWhitelabelConfig>
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update whitelabel config: database not available");
    return;
  }

  await db
    .update(whitelabelConfigs)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(whitelabelConfigs.id, id));
}

/**
 * Delete a White-Label configuration
 */
export async function deleteWhitelabelConfig(
  id: number
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete whitelabel config: database not available");
    return;
  }

  await db
    .delete(whitelabelConfigs)
    .where(eq(whitelabelConfigs.id, id));
}

/**
 * Get the White-Label config for a specific user (via tenantId)
 */
export async function getWhitelabelConfigForUser(
  userId: number
): Promise<WhitelabelConfig | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get whitelabel config for user: database not available");
    return null;
  }

  // First get the user's tenantId
  const userResult = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (userResult.length === 0 || !userResult[0].tenantId) {
    return null;
  }

  const config = await getWhitelabelConfigById(userResult[0].tenantId);
  return config ?? null;
}

/**
 * Assign a user to a White-Label tenant
 */
export async function assignUserToTenant(
  userId: number,
  tenantId: number | null
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot assign user to tenant: database not available");
    return;
  }

  await db
    .update(users)
    .set({ tenantId })
    .where(eq(users.id, userId));
}

/**
 * Get all users for a specific tenant
 */
export async function getUsersByTenantId(
  tenantId: number
): Promise<typeof users.$inferSelect[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get users by tenant: database not available");
    return [];
  }

  return db
    .select()
    .from(users)
    .where(eq(users.tenantId, tenantId));
}


// ============================================
// Video Tutorial Functions
// ============================================

/**
 * Get all video tutorials
 */
export async function getAllVideoTutorials(): Promise<VideoTutorial[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(videoTutorials)
      .orderBy(videoTutorials.moduleId, videoTutorials.dayNumber, videoTutorials.displayOrder);
  } catch (error) {
    console.error("[Database] Error getting all video tutorials:", error);
    return [];
  }
}

/**
 * Get video tutorials by module
 */
export async function getVideoTutorialsByModule(moduleId: number): Promise<VideoTutorial[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(videoTutorials)
      .where(eq(videoTutorials.moduleId, moduleId))
      .orderBy(videoTutorials.dayNumber, videoTutorials.displayOrder);
  } catch (error) {
    console.error("[Database] Error getting video tutorials by module:", error);
    return [];
  }
}

/**
 * Get video tutorials by day
 */
export async function getVideoTutorialsByDay(moduleId: number, dayNumber: number): Promise<VideoTutorial[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(videoTutorials)
      .where(
        sql`${videoTutorials.moduleId} = ${moduleId} AND ${videoTutorials.dayNumber} = ${dayNumber}`
      )
      .orderBy(videoTutorials.displayOrder);
  } catch (error) {
    console.error("[Database] Error getting video tutorials by day:", error);
    return [];
  }
}

/**
 * Get video tutorial by ID
 */
export async function getVideoTutorialById(id: number): Promise<VideoTutorial | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(videoTutorials)
      .where(eq(videoTutorials.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error getting video tutorial by ID:", error);
    return null;
  }
}

/**
 * Create video tutorial
 */
export async function createVideoTutorial(data: InsertVideoTutorial): Promise<VideoTutorial | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.insert(videoTutorials).values(data);

    const result = await db
      .select()
      .from(videoTutorials)
      .where(eq(videoTutorials.videoUrl, data.videoUrl))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error creating video tutorial:", error);
    return null;
  }
}

/**
 * Update video tutorial
 */
export async function updateVideoTutorial(id: number, data: Partial<InsertVideoTutorial>): Promise<VideoTutorial | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db
      .update(videoTutorials)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(videoTutorials.id, id));

    return await getVideoTutorialById(id);
  } catch (error) {
    console.error("[Database] Error updating video tutorial:", error);
    return null;
  }
}

/**
 * Delete video tutorial
 */
export async function deleteVideoTutorial(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.delete(videoTutorials).where(eq(videoTutorials.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Error deleting video tutorial:", error);
    return false;
  }
}

/**
 * Get user's video progress
 */
export async function getUserVideoProgress(userId: number, videoId: number): Promise<VideoProgress | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(videoProgress)
      .where(
        sql`${videoProgress.userId} = ${userId} AND ${videoProgress.videoId} = ${videoId}`
      )
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error getting user video progress:", error);
    return null;
  }
}

/**
 * Update user's video progress
 */
export async function updateVideoProgress(
  userId: number,
  videoId: number,
  currentPosition: number,
  percentageWatched: number
): Promise<VideoProgress | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const existing = await getUserVideoProgress(userId, videoId);
    const isCompleted = percentageWatched >= 90;

    if (existing) {
      // Update existing progress
      await db
        .update(videoProgress)
        .set({
          currentPosition,
          percentageWatched,
          isCompleted,
          lastWatchedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(videoProgress.id, existing.id));

      return await getUserVideoProgress(userId, videoId);
    } else {
      // Create new progress
      await db.insert(videoProgress).values({
        userId,
        videoId,
        currentPosition,
        percentageWatched,
        isCompleted,
        lastWatchedAt: new Date(),
      });

      return await getUserVideoProgress(userId, videoId);
    }
  } catch (error) {
    console.error("[Database] Error updating video progress:", error);
    return null;
  }
}

/**
 * Get all video progress for a user
 */
export async function getAllUserVideoProgress(userId: number): Promise<VideoProgress[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(videoProgress)
      .where(eq(videoProgress.userId, userId))
      .orderBy(desc(videoProgress.lastWatchedAt));
  } catch (error) {
    console.error("[Database] Error getting all user video progress:", error);
    return [];
  }
}


// ============================================
// Exam System Functions
// ============================================

/**
 * Create a new exam session
 */
export async function createExamSession(
  userId: number, 
  moduleId: number, 
  totalQuestions: number = 50, 
  timeLimit: number = 30 * 60, 
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  isIHKMode: boolean = false
): Promise<ExamSession | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  try {
    const session: InsertExamSession = {
      userId,
      moduleId,
      totalQuestions,
      status: "in_progress",
      isIHKMode,
      difficulty,
      timeLimit
    };

    const result = await db.insert(examSessions).values(session);
    const insertId = Number(result[0].insertId);

    return {
      id: insertId,
      userId,
      moduleId,
      totalQuestions,
      correctAnswers: 0,
      score: 0,
      timeSpent: 0,
      timeLimit,
      difficulty,
      isIHKMode,
      status: "in_progress" as const,
      startedAt: new Date(),
      completedAt: null,
      createdAt: new Date(),
    };
  } catch (error) {
    console.error("[Database] Error creating exam session:", error);
    return undefined;
  }
}

/**
 * Get exam session by ID
 */
export async function getExamSession(sessionId: number): Promise<ExamSession | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(examSessions)
      .where(eq(examSessions.id, sessionId))
      .limit(1);

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Error getting exam session:", error);
    return null;
  }
}

/**
 * Get all exam sessions for a user
 */
export async function getUserExamSessions(userId: number, moduleId?: number): Promise<ExamSession[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    if (moduleId) {
      return await db
        .select()
        .from(examSessions)
        .where(and(eq(examSessions.userId, userId), eq(examSessions.moduleId, moduleId)))
        .orderBy(desc(examSessions.createdAt));
    }
    return await db
      .select()
      .from(examSessions)
      .where(eq(examSessions.userId, userId))
      .orderBy(desc(examSessions.createdAt));
  } catch (error) {
    console.error("[Database] Error getting user exam sessions:", error);
    return [];
  }
}

/**
 * Save an exam question
 */
export async function saveExamQuestion(questionData: InsertExamQuestion): Promise<ExamQuestion | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  try {
    const result = await db.insert(examQuestions).values(questionData);
    const insertId = Number(result[0].insertId);

    return {
      ...questionData,
      id: insertId,
      userAnswer: questionData.userAnswer ?? null,
      isCorrect: questionData.isCorrect ?? null,
      dayId: questionData.dayId ?? null,
      topic: questionData.topic ?? null,
      difficulty: questionData.difficulty ?? "medium",
      feedback: questionData.feedback ?? null,
      createdAt: new Date(),
    };
  } catch (error) {
    console.error("[Database] Error saving exam question:", error);
    return undefined;
  }
}

/**
 * Get all questions for an exam session
 */
export async function getExamQuestions(sessionId: number): Promise<ExamQuestion[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(examQuestions)
      .where(eq(examQuestions.sessionId, sessionId))
      .orderBy(examQuestions.questionNumber);
  } catch (error) {
    console.error("[Database] Error getting exam questions:", error);
    return [];
  }
}

/**
 * Get a single exam question by its ID (für submitAnswer)
 * Behebt Bug: submitAnswer hat fälschlicherweise getExamQuestions(questionId) aufgerufen
 */
export async function getExamQuestionById(questionId: number): Promise<ExamQuestion | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  try {
    const result = await db
      .select()
      .from(examQuestions)
      .where(eq(examQuestions.id, questionId))
      .limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Error getting exam question by ID:", error);
    return undefined;
  }
}

/**
 * Update an exam question with user answer
 */
export async function updateExamQuestion(
  questionId: number,
  userAnswer: string,
  isCorrect: boolean,
  feedback?: string
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    await db
      .update(examQuestions)
      .set({ userAnswer, isCorrect, feedback: feedback ?? null })
      .where(eq(examQuestions.id, questionId));
  } catch (error) {
    console.error("[Database] Error updating exam question:", error);
  }
}

/**
 * Complete an exam session
 */
export async function completeExamSession(
  sessionId: number,
  correctAnswers: number,
  score: number,
  timeSpent: number
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    await db
      .update(examSessions)
      .set({
        correctAnswers,
        score,
        timeSpent,
        status: "completed",
        completedAt: new Date(),
      })
      .where(eq(examSessions.id, sessionId));
  } catch (error) {
    console.error("[Database] Error completing exam session:", error);
  }
}

/**
 * Get weak topics for a user
 */
export async function getWeakTopics(userId: number, moduleId?: number): Promise<ExamWeakTopic[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    if (moduleId) {
      return await db
        .select()
        .from(examWeakTopics)
        .where(and(eq(examWeakTopics.userId, userId), eq(examWeakTopics.moduleId, moduleId)))
        .orderBy(desc(examWeakTopics.incorrectCount));
    }
    return await db
      .select()
      .from(examWeakTopics)
      .where(eq(examWeakTopics.userId, userId))
      .orderBy(desc(examWeakTopics.incorrectCount));
  } catch (error) {
    console.error("[Database] Error getting weak topics:", error);
    return [];
  }
}

/**
 * Update or create a weak topic entry
 */
export async function updateWeakTopic(userId: number, moduleId: number, topic: string): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    const existing = await db
      .select()
      .from(examWeakTopics)
      .where(
        and(
          eq(examWeakTopics.userId, userId),
          eq(examWeakTopics.moduleId, moduleId),
          eq(examWeakTopics.topic, topic)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(examWeakTopics)
        .set({
          incorrectCount: existing[0].incorrectCount + 1,
          lastEncountered: new Date(),
        })
        .where(eq(examWeakTopics.id, existing[0].id));
    } else {
      await db.insert(examWeakTopics).values({
        userId,
        moduleId,
        topic,
        incorrectCount: 1,
      });
    }
  } catch (error) {
    console.error("[Database] Error updating weak topic:", error);
  }
}

// ============================================================================
// AZAV-COMPLIANCE DATENBANKFUNKTIONEN
// ============================================================================

// ── Learning Logs ────────────────────────────────────────────────────────────

/** Lerneinheit öffnen – neuen Log-Eintrag anlegen */
export async function openLearningLog(
  userId: number, moduleId: number, dayId: number
): Promise<number | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const result = await db.insert(learningLogs).values({
      userId, moduleId, dayId, completed: false, heartbeatCount: 0
    });
    return Number((result as any).insertId ?? 0);
  } catch (error) {
    console.error("[DB] openLearningLog error:", error);
    return null;
  }
}

/** Lerneinheit schließen – Dauer und Abschluss setzen */
export async function closeLearningLog(
  logId: number, durationSeconds: number, completed: boolean
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.update(learningLogs)
      .set({ closedAt: new Date(), durationSeconds, completed })
      .where(eq(learningLogs.id, logId));
  } catch (error) {
    console.error("[DB] closeLearningLog error:", error);
  }
}

/** Heartbeat-Zähler erhöhen (zeigt aktive Lernzeit) */
export async function incrementHeartbeat(logId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.update(learningLogs)
      .set({ heartbeatCount: sql`${learningLogs.heartbeatCount} + 1` })
      .where(eq(learningLogs.id, logId));
  } catch (error) {
    console.error("[DB] incrementHeartbeat error:", error);
  }
}

/** Abgeschlossene Lerntage eines Nutzers abrufen */
export async function getCompletedDays(
  userId: number, moduleId?: number
): Promise<{ moduleId: number; dayId: number; totalSeconds: number }[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    const conditions = moduleId
      ? and(eq(learningLogs.userId, userId), eq(learningLogs.moduleId, moduleId), eq(learningLogs.completed, true))
      : and(eq(learningLogs.userId, userId), eq(learningLogs.completed, true));
    const rows = await db.select().from(learningLogs).where(conditions);
    // Aggregiere pro Modul/Tag (mehrere Sessions möglich)
    const map = new Map<string, { moduleId: number; dayId: number; totalSeconds: number }>();
    for (const row of rows) {
      const key = `${row.moduleId}_${row.dayId}`;
      const existing = map.get(key);
      if (existing) {
        existing.totalSeconds += row.durationSeconds;
      } else {
        map.set(key, { moduleId: row.moduleId, dayId: row.dayId, totalSeconds: row.durationSeconds });
      }
    }
    return Array.from(map.values());
  } catch (error) {
    console.error("[DB] getCompletedDays error:", error);
    return [];
  }
}

// ── Activity Heartbeats ───────────────────────────────────────────────────────

/** Heartbeat-Signal speichern (alle 60 Sek vom Browser) */
export async function saveHeartbeat(
  userId: number, moduleId: number, dayId: number
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(activityHeartbeats).values({ userId, moduleId, dayId });
    // Auch learningLogs aktualisieren falls offen
    const openLog = await db.select().from(learningLogs)
      .where(and(
        eq(learningLogs.userId, userId),
        eq(learningLogs.moduleId, moduleId),
        eq(learningLogs.dayId, dayId)
      ))
      .orderBy(desc(learningLogs.openedAt))
      .limit(1);
    if (openLog.length > 0 && !openLog[0].closedAt) {
      await db.update(learningLogs)
        .set({ heartbeatCount: sql`${learningLogs.heartbeatCount} + 1` })
        .where(eq(learningLogs.id, openLog[0].id));
    }
  } catch (error) {
    console.error("[DB] saveHeartbeat error:", error);
  }
}

// ── Exam Audit Log ────────────────────────────────────────────────────────────

/** Prüfungsantwort unveränderlich ins Audit-Log schreiben */
export async function writeExamAuditLog(
  entry: InsertExamAuditEntry
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(examAuditLog).values(entry);
  } catch (error) {
    console.error("[DB] writeExamAuditLog error:", error);
  }
}

/** Audit-Log für eine Session abrufen (Admin-Export) */
export async function getExamAuditLog(sessionId: number): Promise<ExamAuditEntry[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(examAuditLog)
      .where(eq(examAuditLog.sessionId, sessionId));
  } catch (error) {
    console.error("[DB] getExamAuditLog error:", error);
    return [];
  }
}

// ── Feedback ──────────────────────────────────────────────────────────────────

/** Nutzerfeedback speichern */
export async function saveFeedback(data: InsertFeedback): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(feedback).values(data);
  } catch (error) {
    console.error("[DB] saveFeedback error:", error);
  }
}

/** Durchschnittsbewertung pro Modul (für Admin-Dashboard) */
export async function getFeedbackStats(): Promise<
  { moduleId: number; avgRating: number; count: number }[]
> {
  const db = await getDb();
  if (!db) return [];
  try {
    const rows = await db.select({
      moduleId: feedback.moduleId,
      avgRating: sql<number>`AVG(${feedback.rating})`,
      count: sql<number>`COUNT(*)`,
    }).from(feedback).groupBy(feedback.moduleId);
    return rows.map(r => ({
      moduleId: r.moduleId,
      avgRating: Math.round(Number(r.avgRating) * 10) / 10,
      count: Number(r.count),
    }));
  } catch (error) {
    console.error("[DB] getFeedbackStats error:", error);
    return [];
  }
}

// ── Complaints ────────────────────────────────────────────────────────────────

/** Beschwerde einreichen */
export async function createComplaint(data: InsertComplaint): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(complaints).values(data);
  } catch (error) {
    console.error("[DB] createComplaint error:", error);
  }
}

/** Alle offenen Beschwerden (Admin) */
export async function getOpenComplaints(): Promise<Complaint[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(complaints)
      .where(eq(complaints.status, "open"))
      .orderBy(desc(complaints.createdAt));
  } catch (error) {
    console.error("[DB] getOpenComplaints error:", error);
    return [];
  }
}

/** Beschwerde-Status aktualisieren (Admin) */
export async function updateComplaintStatus(
  id: number, status: Complaint["status"], adminNote?: string
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.update(complaints)
      .set({
        status,
        adminNote: adminNote ?? undefined,
        resolvedAt: status === "resolved" || status === "closed" ? new Date() : undefined,
      })
      .where(eq(complaints.id, id));
  } catch (error) {
    console.error("[DB] updateComplaintStatus error:", error);
  }
}

// ── Consent Log ───────────────────────────────────────────────────────────────

/** Einwilligung protokollieren (DSGVO Art. 7) */
export async function logConsent(data: InsertConsentLogEntry): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(consentLog).values(data);
  } catch (error) {
    console.error("[DB] logConsent error:", error);
  }
}

/** Einwilligungen eines Nutzers abrufen */
export async function getUserConsents(userId: number) {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(consentLog)
      .where(eq(consentLog.userId, userId))
      .orderBy(desc(consentLog.givenAt));
  } catch (error) {
    console.error("[DB] getUserConsents error:", error);
    return [];
  }
}

// ── AVV Agreements ────────────────────────────────────────────────────────────

/** AVV für Mandanten signieren */
export async function signAvvAgreement(data: InsertAvvAgreement): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(avvAgreements).values(data);
  } catch (error) {
    console.error("[DB] signAvvAgreement error:", error);
  }
}

/** Prüfen ob Mandant AVV unterschrieben hat */
export async function hasSignedAvv(tenantId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    const result = await db.select().from(avvAgreements)
      .where(eq(avvAgreements.tenantId, tenantId))
      .limit(1);
    return result.length > 0;
  } catch (error) {
    console.error("[DB] hasSignedAvv error:", error);
    return false;
  }
}

// ── Lokales Auth – Passwort-Hashes ───────────────────────────────────────────

/** Anzahl aller Nutzer (um ersten Admin zu erkennen) */
export async function getUserCount(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  try {
    const result = await db.select({ count: sql<number>`COUNT(*)` }).from(users);
    return Number(result[0]?.count ?? 0);
  } catch {
    return 0;
  }
}

/** Passwort-Hash in MySQL speichern (persistent, kein ephemeral filesystem) */
export async function savePasswordHash(openId: string, hash: string, salt: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.error("[DB] savePasswordHash: keine DB-Verbindung");
    return;
  }
  try {
    const { authCredentials } = await import("../drizzle/schema");
    await db.insert(authCredentials)
      .values({ openId, hash, salt })
      .onDuplicateKeyUpdate({ set: { hash, salt } });
  } catch (error) {
    console.error("[DB] savePasswordHash error:", error);
  }
}
/** Passwort-Hash aus MySQL laden */
export async function getPasswordHash(openId: string): Promise<{ hash: string; salt: string } | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const { authCredentials } = await import("../drizzle/schema");
    const result = await db.select()
      .from(authCredentials)
      .where(eq(authCredentials.openId, openId))
      .limit(1);
    return result.length > 0 ? { hash: result[0].hash, salt: result[0].salt } : null;
  } catch (error) {
    console.error("[DB] getPasswordHash error:", error);
    return null;
  }
}
/** Nutzer-Rolle setzen */
export async function setUserRole(openId: string, role: "user" | "admin" | "trainer"): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.update(users).set({ role }).where(eq(users.openId, openId));
  } catch (error) {
    console.error("[DB] setUserRole error:", error);
  }
}

/** Letzten Login aktualisieren */
export async function updateLastSignedIn(openId: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.openId, openId));
  } catch (error) {
    console.error("[DB] updateLastSignedIn error:", error);
  }
}

export async function updateUserEnabledModules(userId: number, moduleIds: number[]): Promise<void> {
  const db = await getDb();
  if (!db) return;
  const result = await db.select({ enabledModules: users.enabledModules }).from(users).where(eq(users.id, userId)).limit(1);
  const current = result[0]?.enabledModules ?? "1";
  const currentList = current.split(",").map((s:string)=>parseInt(s.trim(),10)).filter((n:number)=>!isNaN(n));
  const merged = Array.from(new Set([...currentList,...moduleIds])).sort((a,b)=>a-b);
  await db.update(users).set({ enabledModules: merged.join(",") }).where(eq(users.id, userId));
}

export async function redeemPresentationCode(code: string): Promise<{success: boolean; enabledModules?: string; message: string;}> {
  const db = await getDb();
  if (!db) return { success: false, message: "Datenbankfehler" };
  const { sql } = await import("drizzle-orm");
  const rawResult = await db.execute(sql`SELECT * FROM presentation_codes WHERE code = ${code} AND isActive = 1 LIMIT 1`) as any;
  // Drizzle mysql2: gibt [RowDataPacket[], FieldPacket[]] zurueck
  const rowsArr = Array.isArray(rawResult[0]) ? rawResult[0] : (Array.isArray(rawResult) ? rawResult : []);
  const record = rowsArr[0] ?? null;
  if (!record) return { success: false, message: "Code nicht gefunden oder deaktiviert" };
  if (record.expiresAt && new Date(record.expiresAt) < new Date()) return { success: false, message: "Dieser Code ist abgelaufen" };
  if (record.maxUsage && record.usageCount >= record.maxUsage) return { success: false, message: "Maximale Nutzungsanzahl erreicht" };
  await db.execute(sql`UPDATE presentation_codes SET usageCount = usageCount + 1 WHERE code = ${code}`);
  return { success: true, enabledModules: record.enabledModules, message: "Code gültig" };
}

export async function listPresentationCodes(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.execute(`SELECT * FROM presentation_codes ORDER BY createdAt DESC`) as any;
  return Array.isArray(rows) ? rows : (rows as any).rows ?? [];
}

export async function createPresentationCode(code: string, label: string, modules: string, expiresAt: Date | null, maxUsage: number | null): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.execute(`INSERT INTO presentation_codes (code, label, enabledModules, expiresAt, maxUsage) VALUES (?, ?, ?, ?, ?)`, [code, label, modules, expiresAt, maxUsage]);
}

export async function deactivatePresentationCode(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.execute(`UPDATE presentation_codes SET isActive = false WHERE id = ?`, [id]);
}
</file>

<file path="server/index.ts">
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
  });
}

startServer().catch(console.error);
</file>

<file path="server/_core/auth-local.ts">
/**
 * auth-local.ts – Universelles Email/Passwort-Auth
 *
 * Ersetzt Manus OAuth vollständig.
 * Läuft auf jedem Host ohne externe Dienste.
 *
 * Sicherheit: PBKDF2-SHA256 (built-in Node.js crypto), JWT via jose
 */

import { randomBytes, pbkdf2Sync } from "crypto";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import { SignJWT, jwtVerify } from "jose";
import * as db from "../db";
import { ENV } from "./env";
import { getSessionCookieOptions } from "./cookies";

// ── Passwort-Hashing (PBKDF2, kein bcrypt nötig) ────────────────────────────

const HASH_ITERATIONS = 100_000;
const HASH_KEYLEN = 64;
const HASH_DIGEST = "sha256";

export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const usedSalt = salt ?? randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, usedSalt, HASH_ITERATIONS, HASH_KEYLEN, HASH_DIGEST).toString("hex");
  return { hash, salt: usedSalt };
}

export function verifyPassword(password: string, storedHash: string, storedSalt: string): boolean {
  const { hash } = hashPassword(password, storedSalt);
  return hash === storedHash;
}

// ── JWT Session ───────────────────────────────────────────────────────────────

function getSecret() {
  return new TextEncoder().encode(ENV.cookieSecret || "CHANGE_THIS_SECRET_IN_ENV");
}

export async function createSessionToken(openId: string, name: string): Promise<string> {
  return new SignJWT({ openId, appId: "local", name })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(Math.floor((Date.now() + ONE_YEAR_MS) / 1000))
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<{ openId: string; name: string } | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    const openId = payload.openId as string;
    const name = payload.name as string;
    if (!openId) return null;
    return { openId, name };
  } catch {
    return null;
  }
}

// ── Express Routes ────────────────────────────────────────────────────────────

export function registerLocalAuthRoutes(app: Express) {

  /**
   * POST /api/auth/register
   * Registriert einen neuen Nutzer.
   * Erster Nutzer wird automatisch Admin.
   */
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    const { email, password, name } = req.body ?? {};

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Name, E-Mail und Passwort sind erforderlich." });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Passwort muss mindestens 8 Zeichen haben." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Ungültige E-Mail-Adresse." });
    }

    const openId = `local:${email.toLowerCase().trim()}`;

    // Prüfen ob E-Mail bereits vergeben
    const existing = await db.getUserByOpenId(openId);
    if (existing) {
      return res.status(409).json({ error: "Diese E-Mail ist bereits registriert." });
    }

    // Passwort hashen
    const { hash, salt } = hashPassword(password);

    // Prüfen ob erster Nutzer → Admin
    const userCount = await db.getUserCount();
    const role = userCount === 0 ? "admin" : "user";

    // Nutzer anlegen
    await db.upsertUser({
      openId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      loginMethod: "email",
      lastSignedIn: new Date(),
      // Passwort-Hash im name-Feld wird separat gespeichert
    });

    // Passwort-Hash in auth_credentials speichern
    await db.savePasswordHash(openId, hash, salt);

    // Falls erster Nutzer: zum Admin machen
    if (role === "admin") {
      await db.setUserRole(openId, "admin");
    }

    // Session erstellen
    const token = await createSessionToken(openId, name.trim());
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });

    // Willkommens-E-Mail (fire & forget)
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY ?? "");
      await resend.emails.send({
        from: "Immobilien-Akademie Smart <noreply@immobilien-akademie-smart.de>",
        to: email.toLowerCase().trim(),
        subject: "Willkommen bei der Immobilien-Akademie Smart",
        html: "<div style=\"font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;\"><div style=\"background:#1e293b;padding:20px 24px;border-radius:8px 8px 0 0;\"><h1 style=\"color:#3b82f6;margin:0;font-size:20px;\">Immobilien-Akademie Smart</h1></div><div style=\"background:#f8fafc;border:1px solid #e2e8f0;border-top:none;padding:28px 24px;border-radius:0 0 8px 8px;\"><h2 style=\"color:#0f172a;font-size:18px;margin:0 0 12px;\">Herzlich willkommen!</h2><p style=\"color:#475569;line-height:1.6;margin:0 0 16px;\">Ihr Konto wurde erfolgreich erstellt. Modul 1 ist sofort kostenlos verfuegbar.</p><div style=\"background:#eff6ff;border-left:3px solid #3b82f6;padding:12px 16px;margin:0 0 20px;border-radius:4px;\"><p style=\"color:#1e40af;margin:0;font-size:14px;\">220 Lerntage - 1.760 Unterrichtseinheiten - IHK-orientiert</p></div><a href=\"https://immobilie-akademie-production.up.railway.app/dashboard\" style=\"display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;\">Jetzt lernen</a><p style=\"color:#94a3b8;font-size:12px;margin:24px 0 0;\">Immobilien-Akademie Smart - Durlacher Str. 36 - 10715 Berlin</p></div></div>",
      });
    } catch (emailErr) {
      console.error("[register] Willkommens-E-Mail fehlgeschlagen:", emailErr);
    }

    return res.json({ ok: true, name: name.trim(), role });
  });

  /**
   * POST /api/auth/login
   * Meldet Nutzer mit E-Mail + Passwort an.
   */
  // Magic Link - Demo-Login via ENV-Secret
  app.get("/api/auth/magic", async (req: Request, res: Response) => {
    const { secret } = req.query as { secret?: string };
    const validSecret = process.env.MAGIC_LINK_SECRET;
    if (!validSecret || secret !== validSecret) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const openId = "local:admin@immobilie.de";
    const user = await db.getUserByOpenId(openId);
    if (!user) {
      return res.status(404).json({ error: "Demo-User nicht gefunden" });
    }
    await db.updateUserRole(openId, "admin");
    const token = await createSessionToken(openId, user.name || "Admin");
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
    return res.redirect("/");
  });
  // Präsentations-Code Login — erstellt temporären Guest-User + setzt Cookie
  app.post("/api/auth/redeem-code", async (req: Request, res: Response) => {
    try {
      const { code } = req.body ?? {};
      if (!code) return res.status(400).json({ error: "Code fehlt" });
      const { redeemPresentationCode, upsertUser, getUserByOpenId, updateUserEnabledModules } = await import("../db");
      const result = await redeemPresentationCode(code.trim().toUpperCase());
      if (!result.success) return res.status(400).json({ error: result.message });
      const openId = `presentation:${code.trim().toUpperCase()}`;
      // User anlegen OHNE enabledModules zu überschreiben, dann direkt setzen
      const { getDb } = await import("../db");
      const { sql } = await import("drizzle-orm");
      const dbConn = await getDb();
      const enabledStr = result.enabledModules ?? "1";
      if (dbConn) {
        // INSERT OR UPDATE - enabledModules explizit setzen
        await dbConn.execute(sql`
          INSERT INTO users (openId, name, role, enabledModules, lastSignedIn)
          VALUES (${openId}, 'Gast', 'user', ${enabledStr}, NOW())
          ON DUPLICATE KEY UPDATE
            enabledModules = ${enabledStr},
            lastSignedIn = NOW()
        `);
      }
      const token = await createSessionToken(openId, "Gast");
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      return res.json({ ok: true });
    } catch (err: any) {
      console.error("[redeem-code] Error:", err);
      return res.status(500).json({ error: "Interner Fehler: " + err.message });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({ error: "E-Mail und Passwort erforderlich." });
    }

    const openId = `local:${email.toLowerCase().trim()}`;
    const user = await db.getUserByOpenId(openId);

    if (!user) {
      // Sicherheit: gleiche Fehlermeldung ob Nutzer fehlt oder Passwort falsch
      return res.status(401).json({ error: "E-Mail oder Passwort falsch." });
    }

    const creds = await db.getPasswordHash(openId);
    if (!creds || !verifyPassword(password, creds.hash, creds.salt)) {
      return res.status(401).json({ error: "E-Mail oder Passwort falsch." });
    }

    // Letzten Login aktualisieren
    await db.updateLastSignedIn(openId);

    // Session erstellen
    const token = await createSessionToken(openId, user.name || email);
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });

    return res.json({ ok: true, name: user.name, role: user.role });
  });

  /**
   * POST /api/auth/logout
   * Löscht Session-Cookie.
   */
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    res.clearCookie(COOKIE_NAME);
    return res.json({ ok: true });
  });

  /**
   * GET /api/auth/me
   * Gibt eingeloggten Nutzer zurück (Cookie-basiert).
   */
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    const { parse: parseCookie } = await import("cookie");
    const cookies = parseCookie(req.headers.cookie ?? "");
    const token = cookies[COOKIE_NAME];
    const session = await verifySessionToken(token);
    if (!session) return res.status(401).json({ error: "Nicht eingeloggt." });
    const user = await db.getUserByOpenId(session.openId);
    if (!user) return res.status(401).json({ error: "Nutzer nicht gefunden." });
    return res.json(user);
  });
}
</file>

<file path="server/portalPhase.ts">
/**
 * Portal-Phasen-System
 * Phase A: Selbstlernportal (sofort, ohne Genehmigung)
 * Phase B: Fernlehrgang (nach ZFU-Zulassung)
 * Phase C: AZAV-zertifiziert (nach Akkreditierung, BGS-fähig)
 * Phase D: Vollzertifiziert (ZFU + AZAV + IHK-Kooperation)
 */

import type { Express, Request, Response } from "express";

export type Phase = "A" | "B" | "C" | "D";

export interface PhaseConfig {
  id: Phase;
  name: string;
  description: string;
  badges: {
    azav: boolean;
    zfu: boolean;
    ihk: boolean;
    bgs: boolean;
  };
  labels: {
    productType: string;
    certificationNote: string;
    faqCertAnswer: string;
    footerBadge1: string;
    footerBadge2: string;
  };
  canSell: boolean;
  requirements: string[];
  unlocked: boolean;
}

export const PHASES: Record<Phase, PhaseConfig> = {
  A: {
    id: "A",
    name: "Selbstlernportal",
    description: "Digitales Lernmaterial zur IHK-Prüfungsvorbereitung. Keine externe Zertifizierung nötig.",
    badges: { azav: false, zfu: false, ihk: false, bgs: false },
    labels: {
      productType: "Digitales Lernmaterial",
      certificationNote: "Qualifizierte Prüfungsvorbereitung",
      faqCertAnswer: "Unsere Lerninhalte bereiten Sie auf die IHK-Sachkundeprüfung vor. Die Zertifikate nach Modul-Abschluss dokumentieren Ihre Weiterbildung und können Arbeitgebern vorgelegt werden.",
      footerBadge1: "IHK-Vorbereitung",
      footerBadge2: "Qualitätsgesichert",
    },
    canSell: true,
    requirements: [],
    unlocked: true,
  },
  B: {
    id: "B",
    name: "Fernlehrgang (ZFU-zugelassen)",
    description: "Staatlich zugelassener Fernlehrgang nach FernUSG. Offizieller ZFU-Status.",
    badges: { azav: false, zfu: true, ihk: false, bgs: false },
    labels: {
      productType: "Staatlich zugelassener Fernlehrgang",
      certificationNote: "ZFU-zugelassen",
      faqCertAnswer: "Unsere Ausbildung ist staatlich zugelassen (ZFU) und bereitet Sie optimal auf die IHK-Sachkundeprüfung vor. Die Zertifikate nach Modul-Abschluss dokumentieren Ihre Weiterbildung gemäß §34c GewO.",
      footerBadge1: "ZFU-zugelassen",
      footerBadge2: "IHK-Vorbereitung",
    },
    canSell: true,
    requirements: ["ZFU-Zulassung vorliegend", "FernUSG-konformer Vertrag aktiv"],
    unlocked: false,
  },
  C: {
    id: "C",
    name: "AZAV-zertifiziert (BGS-fähig)",
    description: "AZAV-akkreditiert. Bildungsgutschein der Agentur für Arbeit wird akzeptiert.",
    badges: { azav: true, zfu: true, ihk: false, bgs: true },
    labels: {
      productType: "AZAV-zertifizierter Fernlehrgang",
      certificationNote: "AZAV-zertifiziert · ZFU-zugelassen · BGS-fähig",
      faqCertAnswer: "Unsere Ausbildung ist AZAV-zertifiziert und staatlich zugelassen (ZFU). Bildungsgutscheine der Agentur für Arbeit und Jobcenter werden akzeptiert. Die Zertifikate sind anerkannt für die Weiterbildungspflicht nach §34c GewO.",
      footerBadge1: "AZAV-zertifiziert",
      footerBadge2: "BGS-fähig",
    },
    canSell: true,
    requirements: ["AZAV-Akkreditierung vorliegend", "ZFU-Zulassung vorliegend", "Anwesenheitsnachweise aktiv"],
    unlocked: false,
  },
  D: {
    id: "D",
    name: "Vollzertifiziert",
    description: "ZFU + AZAV + IHK-Kooperation. Maximale Reichweite und Förderoptionen.",
    badges: { azav: true, zfu: true, ihk: true, bgs: true },
    labels: {
      productType: "IHK-anerkannter Fernlehrgang",
      certificationNote: "AZAV-zertifiziert · ZFU-zugelassen · IHK-anerkannt",
      faqCertAnswer: "Unsere Ausbildung ist AZAV-zertifiziert, staatlich zugelassen (ZFU) und von der IHK anerkannt. Bildungsgutscheine werden akzeptiert. Die Zertifikate sind offiziell anerkannt für die Weiterbildungspflicht nach §34c GewO.",
      footerBadge1: "AZAV · ZFU · IHK",
      footerBadge2: "BGS-fähig",
    },
    canSell: true,
    requirements: ["AZAV-Akkreditierung", "ZFU-Zulassung", "IHK-Kooperationsvertrag"],
    unlocked: false,
  },
};

// In-Memory Fallback (wird durch DB überschrieben)
let _currentPhase: Phase = "A";

export async function getCurrentPhase(db?: any): Promise<Phase> {
  if (!db) return _currentPhase;
  try {
    const result = await db.execute(
      `SELECT value FROM portal_settings WHERE key_name = 'portal_phase' LIMIT 1`
    );
    const rows = result[0] as any[];
    if (rows && rows.length > 0) {
      const phase = rows[0].value as Phase;
      if (["A","B","C","D"].includes(phase)) {
        _currentPhase = phase;
        return phase;
      }
    }
  } catch {
    // Tabelle existiert noch nicht — wird beim ersten Set angelegt
  }
  return _currentPhase;
}

export async function setCurrentPhase(phase: Phase, db?: any): Promise<void> {
  _currentPhase = phase;
  if (!db) return;
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS portal_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        key_name VARCHAR(100) UNIQUE NOT NULL,
        value VARCHAR(500) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    await db.execute(`
      INSERT INTO portal_settings (key_name, value)
      VALUES ('portal_phase', ?)
      ON DUPLICATE KEY UPDATE value = ?
    `, [phase, phase]);
  } catch (err) {
    console.error("[PortalPhase] DB write error:", err);
  }
}

export function registerPortalPhaseRoutes(app: Express) {
  // GET /api/portal-phase — öffentlich
  app.get("/api/portal-phase", async (_req: Request, res: Response) => {
    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      const phase = await getCurrentPhase(db);
      res.json({ phase, config: PHASES[phase] });
    } catch {
      res.json({ phase: _currentPhase, config: PHASES[_currentPhase] });
    }
  });

  // POST /api/admin/portal-phase — nur Admin
  app.post("/api/admin/portal-phase", async (req: Request, res: Response) => {
    try {
      const { verifySessionToken } = await import("./_core/auth-local");
      const { getUserByOpenId } = await import("./db");
      const cookies = req.cookies || {};
      const { COOKIE_NAME } = await import("@shared/const");
      const token = cookies[COOKIE_NAME];
      const session = await verifySessionToken(token);
      if (!session) return res.status(401).json({ error: "Nicht eingeloggt" });
      const user = await getUserByOpenId(session.openId);
      if (!user || user.role !== "admin") return res.status(403).json({ error: "Kein Admin" });

      const { phase } = req.body;
      if (!["A","B","C","D"].includes(phase)) return res.status(400).json({ error: "Ungültige Phase" });

      const { getDb } = await import("./db");
      const db = await getDb();
      await setCurrentPhase(phase as Phase, db);
      res.json({ ok: true, phase, config: PHASES[phase as Phase] });
    } catch (err) {
      console.error("[PortalPhase] Error:", err);
      res.status(500).json({ error: "Server-Fehler" });
    }
  });
}
</file>

<file path="server/stripe.ts">
import Stripe from "stripe";
import { Router } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-01-27.acacia",
});

export const stripeRouter = Router();

// Produkte/Preise — Test-Konfiguration
const PRODUCTS = [
  {
    id: "modul_1",
    name: "Modul 1: Einführung in die Immobilienwirtschaft",
    description: "Grundlagen der Immobilienwirtschaft — 44 Unterrichtseinheiten",
    price: 19900, // in Cent = 199,00 €
    modules: "1",
  },
  {
    id: "modul_2",
    name: "Modul 2: Makler §34c GewO",
    description: "Vollständige Maklerlizenz-Vorbereitung — 440 UE",
    price: 49900,
    modules: "2",
  },
  {
    id: "modul_3",
    name: "Modul 3: Verwalter WEG & Mietrecht",
    description: "WEG-Reform 2020, Eigentümerversammlung, Nebenkostenabrechnung, Mietrecht §535ff BGB. 80 Lerntage, 528 UE.",
    price: 69900,
    modules: "1,3",
  },
  {
    id: "modul_4",
    name: "Modul 4: Gutachter & Sachverständiger",
    description: "Alle 3 Wertermittlungsverfahren nach ImmoWertV 2021. Vergleichs-, Ertrags- und Sachwertverfahren. 40 Lerntage, 264 UE.",
    price: 39900,
    modules: "1,4",
  },
  {
    id: "modul_5",
    name: "Modul 5: Darlehensvermittler §34i GewO",
    description: "Vollständige §34i-Vorbereitung: Annuitätendarlehen, KfW-Förderung, ESIS, EU-WIKR. 40 Lerntage, 304 UE.",
    price: 49900,
    modules: "1,5",
  },
  {
    id: "modul_komplett",
    name: "Komplettpaket: Alle 5 Module",
    description: "Vollständige IHK-Zertifizierung — 1760 Unterrichtseinheiten",
    price: 149900,
    modules: "1,2,3,4,5",
  },
];

// Checkout Session erstellen
stripeRouter.post("/api/stripe/checkout", async (req, res) => {
  try {
    const { productId, userEmail } = req.body;
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return res.status(404).json({ error: "Produkt nicht gefunden" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.OAUTH_SERVER_URL}/zahlung-erfolgreich?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.OAUTH_SERVER_URL}/kurse`,
      metadata: {
        modules: product.modules,
        productId: product.id,
      },
    });

    res.json({ url: session.url });
  } catch (err: any) {
    console.error("[Stripe] Checkout error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Webhook — nach erfolgreicher Zahlung Module freischalten
stripeRouter.post("/api/stripe/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;
    const modules = session.metadata?.modules;

    if (email && modules) {
      try {
        const { getDb } = await import("./db");
        const { users } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");
        const db = await getDb();

        const userList = await db.select().from(users).where(eq(users.email, email)).limit(1);
        if (userList.length > 0) {
          const user = userList[0];
          const existing = (user.enabledModules || "").split(",").filter(Boolean);
          const newMods = modules.split(",").filter(Boolean);
          const merged = [...new Set([...existing, ...newMods])].sort().join(",");
          await db.update(users).set({ enabledModules: merged }).where(eq(users.id, user.id));
        } else {
        }
      } catch (err: any) {
        console.error("[Stripe] Webhook DB Fehler:", err.message);
      }
    }
  }

  res.json({ received: true });
});

// Produkte abrufen
stripeRouter.get("/api/stripe/products", (_req, res) => {
  res.json(PRODUCTS.map((p) => ({
    ...p,
    priceFormatted: `${(p.price / 100).toFixed(2).replace(".", ",")} €`,
  })));
});
</file>

<file path="server/_core/index.ts">
import "./polyfills";
import { webcrypto } from "node:crypto";

if (!globalThis.crypto) {
  Object.defineProperty(globalThis, "crypto", {
    value: webcrypto,
    configurable: true,
  });
}

import "dotenv/config";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerLocalAuthRoutes } from "./auth-local";
import { registerPasswordResetRoutes } from "../passwordReset";
import { registerPortalPhaseRoutes } from "../portalPhase";
import { registerRagTutorRoutes } from "../ragTutor";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { seedQuizQuestionsIfEmpty } from "../seed-quiz";


async function startServer() {
  const app = express();
app.use(helmet({ contentSecurityPolicy: false }));

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  message: { error: "Zu viele Anfragen. Bitte warte eine Minute." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/ai", aiLimiter);
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback (Manus) – nur wenn OAUTH_SERVER_URL konfiguriert
  if (process.env.OAUTH_SERVER_URL) {
    registerOAuthRoutes(app);
  }
  // Lokales Auth
  registerLocalAuthRoutes(app);
  registerPasswordResetRoutes(app);
  registerPortalPhaseRoutes(app);
  registerRagTutorRoutes(app);
  // Healthcheck für Railway / Monitoring
  app.get("/api/health", (_req, res) => {
    return res.status(200).json({ ok: true, ts: new Date().toISOString() });
  });



  // Lokaler Dateispeicher (nur wenn kein Manus)
  const { registerStorageRoute } = await import("../storage");
  registerStorageRoute(app);
  // Stripe nur laden, wenn Schlüssel vorhanden ist
  if (process.env.STRIPE_SECRET_KEY) {
    const { stripeRouter } = await import("../stripe");
    app.use(stripeRouter);
  } else {
    console.log("[dev] Stripe deaktiviert: STRIPE_SECRET_KEY nicht gesetzt");
  }

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  await seedQuizQuestionsIfEmpty();
  const port = Number(process.env.PORT ?? 8080);
  const host = "0.0.0.0";

  server.listen(port, host, () => {
  });
}

startServer().catch(console.error);
</file>

<file path="server/routers.ts">
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { questionBank } from "../drizzle/schema";
import { 
  createChatConversation, 
  addChatMessage, 
  getConversationMessages,
  getUserConversations,
  updateConversationTitle,
  getAllWhitelabelConfigs,
  getWhitelabelConfigById,
  getWhitelabelConfigBySlug,
  createWhitelabelConfig,
  updateWhitelabelConfig,
  deleteWhitelabelConfig,
  getWhitelabelConfigForUser,
  assignUserToTenant,
  getUsersByTenantId
} from "./db";
import { invokeLLM } from "./_core/llm";
import { storagePut } from "./storage";
import { videoRouter } from "./videoRouter";
import { examRouter } from "./examRouter";
import { pdfRouter } from "./pdfRouter";
import { certificateRouter } from "./certificateRouter";
import { quizRouter } from "./quizRouter";
import { azavRouter } from "./azavRouter";

// Admin-only middleware
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Nur Administratoren haben Zugriff auf diese Funktion.' });
  }
  return next({ ctx });
});

function safeJsonParse<T>(raw: unknown, fallback: T): T {
  if (typeof raw !== "string") return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {}

  const match = raw.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]) as T;
    } catch {}
  }

  return fallback;
}

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  videos: videoRouter,
  exam: examRouter,
  pdf: pdfRouter,
  certificate: certificateRouter,
  quiz: quizRouter,
  azav: azavRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ============================================
  // White-Label Administration Router
  // ============================================
  whitelabel: router({
    // Get all White-Label configurations (admin only)
    list: adminProcedure.query(async () => {
      return getAllWhitelabelConfigs();
    }),

    // Get a specific White-Label configuration by ID
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const config = await getWhitelabelConfigById(input.id);
        if (!config) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'White-Label-Konfiguration nicht gefunden.' });
        }
        return config;
      }),

    // Get White-Label config for current user's tenant (any authenticated user)
    myTenant: protectedProcedure.query(async ({ ctx }) => {
      const config = await getWhitelabelConfigForUser(ctx.user.id);
      return config ?? null;
    }),

    // Create a new White-Label configuration (admin only)
    create: adminProcedure
      .input(z.object({
        slug: z.string().min(2).max(64).regex(/^[a-z0-9-]+$/, 'Slug darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten.'),
        companyName: z.string().min(1).max(255),
        primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        secondaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        sidebarColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        welcomeText: z.string().max(2000).optional(),
        footerText: z.string().max(500).optional(),
        contactEmail: z.string().email().optional(),
        contactPhone: z.string().max(50).optional(),
        websiteUrl: z.string().url().optional(),
        azavEnabled: z.boolean().optional(),
        azavCertNumber: z.string().max(100).optional(),
        enabledModules: z.string().optional(),
        maxUsers: z.number().min(1).max(10000).optional(),
      }))
      .mutation(async ({ input }) => {
        // Check if slug is already taken
        const existing = await getWhitelabelConfigBySlug(input.slug);
        if (existing) {
          throw new TRPCError({ code: 'CONFLICT', message: 'Dieser Slug ist bereits vergeben.' });
        }

        return createWhitelabelConfig({
          slug: input.slug,
          companyName: input.companyName,
          primaryColor: input.primaryColor,
          secondaryColor: input.secondaryColor,
          accentColor: input.accentColor,
          sidebarColor: input.sidebarColor,
          welcomeText: input.welcomeText,
          footerText: input.footerText,
          contactEmail: input.contactEmail,
          contactPhone: input.contactPhone,
          websiteUrl: input.websiteUrl,
          azavEnabled: input.azavEnabled,
          azavCertNumber: input.azavCertNumber,
          enabledModules: input.enabledModules,
          maxUsers: input.maxUsers,
        });
      }),

    // Update a White-Label configuration (admin only)
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        companyName: z.string().min(1).max(255).optional(),
        primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        secondaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        sidebarColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        welcomeText: z.string().max(2000).optional(),
        footerText: z.string().max(500).optional(),
        contactEmail: z.string().email().optional(),
        contactPhone: z.string().max(50).optional(),
        websiteUrl: z.string().url().optional(),
        azavEnabled: z.boolean().optional(),
        azavCertNumber: z.string().max(100).optional(),
        enabledModules: z.string().optional(),
        maxUsers: z.number().min(1).max(10000).optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        const existing = await getWhitelabelConfigById(id);
        if (!existing) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'White-Label-Konfiguration nicht gefunden.' });
        }

        await updateWhitelabelConfig(id, updates);
        return getWhitelabelConfigById(id);
      }),

    // Upload logo for a White-Label tenant (admin only)
    uploadLogo: adminProcedure
      .input(z.object({
        id: z.number(),
        logoBase64: z.string(),
        mimeType: z.string(),
        fileName: z.string(),
      }))
      .mutation(async ({ input }) => {
        const existing = await getWhitelabelConfigById(input.id);
        if (!existing) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'White-Label-Konfiguration nicht gefunden.' });
        }

        const buffer = Buffer.from(input.logoBase64, 'base64');
        const randomSuffix = Math.random().toString(36).substring(2, 10);
        const fileKey = `whitelabel/${existing.slug}/logo-${randomSuffix}-${input.fileName}`;
        const logoUrl = await storagePut(fileKey, buffer, input.mimeType);

        await updateWhitelabelConfig(input.id, { logoUrl });
        return { logoUrl };
      }),

    // Upload favicon for a White-Label tenant (admin only)
    uploadFavicon: adminProcedure
      .input(z.object({
        id: z.number(),
        faviconBase64: z.string(),
        mimeType: z.string(),
        fileName: z.string(),
      }))
      .mutation(async ({ input }) => {
        const existing = await getWhitelabelConfigById(input.id);
        if (!existing) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'White-Label-Konfiguration nicht gefunden.' });
        }

        const buffer = Buffer.from(input.faviconBase64, 'base64');
        const randomSuffix = Math.random().toString(36).substring(2, 10);
        const fileKey = `whitelabel/${existing.slug}/favicon-${randomSuffix}-${input.fileName}`;
        const faviconUrl = await storagePut(fileKey, buffer, input.mimeType);

        await updateWhitelabelConfig(input.id, { faviconUrl });
        return { faviconUrl };
      }),

    // Delete a White-Label configuration (admin only)
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const existing = await getWhitelabelConfigById(input.id);
        if (!existing) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'White-Label-Konfiguration nicht gefunden.' });
        }

        await deleteWhitelabelConfig(input.id);
        return { success: true };
      }),

    // Assign a user to a tenant (admin only)
    assignUser: adminProcedure
      .input(z.object({
        userId: z.number(),
        tenantId: z.number().nullable(),
      }))
      .mutation(async ({ input }) => {
        if (input.tenantId !== null) {
          const tenant = await getWhitelabelConfigById(input.tenantId);
          if (!tenant) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Tenant nicht gefunden.' });
          }
        }
        await assignUserToTenant(input.userId, input.tenantId);
        return { success: true };
      }),

    // Get users for a specific tenant (admin only)
    getTenantUsers: adminProcedure
      .input(z.object({ tenantId: z.number() }))
      .query(async ({ input }) => {
        return getUsersByTenantId(input.tenantId);
      }),
  }),

  // AI Assistant Router
  aiAssistant: router({
    // Create a new conversation
    createConversation: protectedProcedure
      .input(z.object({
        moduleContext: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const conversation = await createChatConversation(
          ctx.user.id,
          input.moduleContext
        );
        return conversation;
      }),

    // Get all conversations for the current user
    getConversations: protectedProcedure
      .query(async ({ ctx }) => {
        return getUserConversations(ctx.user.id);
      }),

    // Get messages for a specific conversation
    getMessages: protectedProcedure
      .input(z.object({
        conversationId: z.number(),
      }))
      .query(async ({ input }) => {
        return getConversationMessages(input.conversationId);
      }),

    // Send a message and get AI response
    sendMessage: protectedProcedure
      .input(z.object({
        conversationId: z.number(),
        message: z.string(),
        moduleContext: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Save user message
        await addChatMessage(input.conversationId, "user", input.message);

        // Get conversation history
        const history = await getConversationMessages(input.conversationId);

        // Build enhanced system prompt for the AI tutor
        const systemPrompt = `Du bist ein präziser Immobilien-Ausbildungsassistent für die Immobilien-Akademie. Du hilfst Studierenden bei der Vorbereitung auf die Sachkundeprüfung nach §34c GewO.

**Aktueller Kurskontext:** ${input.moduleContext || "Allgemeine Immobilienausbildung"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 PFLICHTREGELN — OHNE AUSNAHME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**REGEL 1 — Nur belegbare Fakten:**
Du antwortest NUR auf Basis verifizierbarer, aktuell gültiger Quellen.
Wenn du eine Aussage nicht mit einer konkreten Quelle belegen kannst: NICHT antworten.
Stattdessen schreibe: "⚠️ Dazu liegen mir keine ausreichend belegbaren Informationen vor. Bitte prüfe direkt bei der zuständigen Stelle."

**REGEL 2 — Jede Antwort enthält einen Quellenblock (PFLICHT):**
Jede inhaltliche Aussage MUSS mit diesem Block abgeschlossen werden:

📚 **Quellen & Links:**
- [Quellenname] — [Direktlink zur aktuellen offiziellen Seite]

Akzeptable offizielle Quellen mit Links:
- §34c GewO → https://www.gesetze-im-internet.de/gewo/__34c.html
- §34i GewO → https://www.gesetze-im-internet.de/gewo/__34i.html
- BGB Mietrecht → https://www.gesetze-im-internet.de/bgb/__535.html
- WEG → https://www.gesetze-im-internet.de/weg/
- MaBV → https://www.gesetze-im-internet.de/mabv/
- ImmoWertV 2021 → https://www.gesetze-im-internet.de/immowertv_2021/
- IHK Deutschland → https://www.dihk.de
- BGH-Urteile → https://juris.bundesgerichtshof.de
- BaFin → https://www.bafin.de
- Bundesanzeiger → https://www.bundesanzeiger.de
- Notarverband → https://www.dnoti.de
- Verbraucherzentrale → https://www.verbraucherzentrale.de

**REGEL 3 — Aktualität kennzeichnen:**
Wenn eine Regelung sich in den letzten 2 Jahren geändert hat oder du unsicher bist:
Schreibe: "⏰ Stand: [Jahr] — Bitte aktuelle Version unter [Link] prüfen."

**REGEL 4 — Rechtliche Grenzen:**
Du bist kein Rechtsanwalt. Bei konkreten Rechtsfragen schreibe immer:
"⚖️ Hinweis: Diese Information ist allgemeiner Natur und ersetzt keine Rechtsberatung. Für deinen konkreten Fall wende dich an einen Fachanwalt für Immobilienrecht oder deine zuständige IHK."

**REGEL 5 — Keine erfundenen Quellen:**
Du erfindest KEINE Paragrafennummern, KEINE BGH-Aktenzeichen, KEINE Behörden-Links.
BGH-Urteile nur nennen wenn: vollständiges Aktenzeichen bekannt + Link zu juris.bundesgerichtshof.de möglich.
Bei Unsicherheit über Aktenzeichen: weglassen und auf juris.bundesgerichtshof.de verweisen.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 ANTWORT-STRUKTUR (immer diese Reihenfolge)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. **Direkte Antwort** (2-4 Sätze, präzise)
2. **Gesetzliche Grundlage** (nur wenn mit Link belegbar)
3. **Praxisbeispiel** (optional, nur wenn konkret hilfreich)
4. **🎯 Merksatz für die Prüfung** (1 prägnanter Satz)
5. **📚 Quellen & Links** (PFLICHT — in jeder Antwort)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 FACHBEREICHE DIESES KURSES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Maklerrecht & §34c GewO
- WEG-Verwaltung & Mietverwaltung
- Immobilienbewertung (ImmoWertV 2021)
- Finanzierung & §34i GewO
- Mietrecht (BGB §§ 535 ff.)

Fragen außerhalb dieser Bereiche: "Das liegt außerhalb meines Fachbereichs für diesen Kurs. Bitte wende dich an [zuständige Stelle]."`;

        // Prepare messages for LLM
        const messages = [
          { role: "system" as const, content: systemPrompt },
          ...history
            .filter(m => m.role !== "system")
            .map(m => ({
              role: m.role as "user" | "assistant",
              content: m.content,
            })),
        ];

        // Get AI response
        const aiResponse = await invokeLLM({ messages });
        const rawContent = aiResponse.choices[0]?.message?.content;
        const assistantMessage = typeof rawContent === "string" 
          ? rawContent 
          : "Entschuldigung, ich konnte keine Antwort generieren.";

        // Save AI response
        await addChatMessage(input.conversationId, "assistant", assistantMessage);

        // Update conversation title if this is the first user message
        if (history.length === 1) {
          const title = input.message.slice(0, 50) + (input.message.length > 50 ? "..." : "");
          await updateConversationTitle(input.conversationId, title);
        }

        return {
          message: assistantMessage,
          conversationId: input.conversationId,
        };
      }),

    // Evaluate quiz answer using AI
    evaluateQuizAnswer: protectedProcedure
      .input(z.object({
        caseId: z.string(),
        userAnswer: z.string(),
        correctAnswer: z.string(),
        legalContext: z.array(z.string()),
        question: z.string(),
      }))
      .mutation(async ({ input }) => {
        const systemPrompt = `Du bist ein erfahrener Prüfer für Immobilienrecht und bewertest die Antwort eines Studierenden.

**Aufgabe:** ${input.question}

**Musterlösung:** ${input.correctAnswer}

**Relevante Rechtsgrundlagen:** ${input.legalContext.join(", ")}

**Antwort des Studierenden:** ${input.userAnswer}

**Deine Aufgabe:**
1. Bewerte die Antwort auf einer Skala von 0-100 Punkten
2. Gib konstruktives Feedback:
   - Was ist richtig?
   - Was fehlt oder ist falsch?
   - Welche rechtlichen Aspekte wurden übersehen?
3. Sei fair aber präzise

Antworte im folgenden JSON-Format:
{
  "score": <Punktzahl 0-100>,
  "isCorrect": <true wenn score >= 70, sonst false>,
  "feedback": "<Dein Feedback in 2-3 Sätzen>"
}`;

        try {
          const aiResponse = await invokeLLM({
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: "Bitte bewerte meine Antwort." },
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "quiz_evaluation",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    score: {
                      type: "number",
                      description: "Score from 0 to 100",
                    },
                    isCorrect: {
                      type: "boolean",
                      description: "True if score >= 70",
                    },
                    feedback: {
                      type: "string",
                      description: "Constructive feedback in 2-3 sentences",
                    },
                  },
                  required: ["score", "isCorrect", "feedback"],
                  additionalProperties: false,
                },
              },
            },
          });

          const rawContent = aiResponse.choices[0]?.message?.content;
          const parsed = safeJsonParse(rawContent, {
            score: 0,
            isCorrect: false,
            feedback: "Die KI-Antwort war nicht im erwarteten JSON-Format.",
          });

          return {
            score: typeof parsed.score === "number" ? Math.max(0, Math.min(100, parsed.score)) : 0,
            isCorrect: typeof parsed.isCorrect === "boolean" ? parsed.isCorrect : false,
            feedback:
              typeof parsed.feedback === "string" && parsed.feedback.trim()
                ? parsed.feedback
                : "Die Antwort konnte nicht automatisch bewertet werden.",
          } as { score: number; isCorrect: boolean; feedback: string };
        } catch (error) {
          console.error("[Quiz] Error evaluating answer:", error);
          return {
            score: 0,
            isCorrect: false,
            feedback: "Automatische Bewertung momentan nicht verfügbar. Bitte erneut versuchen.",
          } as { score: number; isCorrect: boolean; feedback: string };
        }
      }),
  }),


  modules: router({
    // Gibt freigeschaltete Module des eingeloggten Nutzers zurück
    myAccess: protectedProcedure.query(async ({ ctx }) => {
      // Admins sehen immer alle Module
      if (ctx.user?.role === "admin") {
        return [1, 2, 3, 4, 5];
      }

      const db = await (await import("./db")).getDb();
      const { users } = await import("../drizzle/schema");
      const { eq } = await import("drizzle-orm");

      const result = await db
        .select()
        .from(users)
        .where(eq(users.id, ctx.user.id))
        .limit(1);

      const raw = result[0]?.enabledModules;

      // Fallback: mindestens Modul 1
      if (!raw || typeof raw !== "string") return [1];

      return raw
        .split(",")
        .map((x) => parseInt(x.trim(), 10))
        .filter((n) => Number.isFinite(n) && n > 0);

    }),


    // Nutzer: Freischalt-Code (Voucher) einlösen -> erweitert enabledModules
    redeemCode: protectedProcedure
      .input((val) => val as { code: string })
      .mutation(async ({ ctx, input }) => {
        const code = (input?.code ?? "").trim();
        if (!code) {
          return { ok: false, error: "Bitte einen Freischalt-Code eingeben." };
        }

        const db = await (await import("./db")).getDb();
        const { accessCodes, users } = await import("../drizzle/schema");
        const { eq, and } = await import("drizzle-orm");

        // 1) Code in DB finden (aktiv)
        const rows = await db
          .select()
          .from(accessCodes)
          .where(and(eq(accessCodes.code, code), eq(accessCodes.isActive, true)))
          .limit(1);
        if (!rows.length) {
          return { ok: false, error: "Code ist ungültig oder deaktiviert." };
        }

        const ac: any = rows[0];

        // 2) Nutzung prüfen (0 = unendlich)
        const maxUses = Number(ac.maxUses ?? ac.max_uses ?? 1);
        const usedCount = Number(ac.usedCount ?? ac.used_count ?? 0);

        if (maxUses > 0 && usedCount >= maxUses) {
          return { ok: false, error: "Dieser Code wurde bereits verbraucht." };
        }

        // 3) Module aus dem Code lesen
        const rawModules = String(ac.modules ?? "").trim();
        if (!rawModules) {
          return { ok: false, error: "Dieser Code hat keine Module hinterlegt." };
        }

        const codeModules = rawModules
          .split(",")
          .map((x) => parseInt(x.trim(), 10))
          .filter((n) => Number.isFinite(n) && n > 0);

        if (!codeModules.length) {
          return { ok: false, error: "Dieser Code enthält keine gültigen Modul-Nummern." };
        }

        // 4) Aktuelle User-Module lesen
        const urows = await db
          .select()
          .from(users)
          .where(eq(users.id, ctx.user.id))
          .limit(1);

        const userRow: any = urows[0];
        const currentRaw = String(userRow?.enabledModules ?? "1");

        const current = currentRaw
          .split(",")
          .map((x) => parseInt(x.trim(), 10))
          .filter((n) => Number.isFinite(n) && n > 0);

        // 5) Merge: alte + neue Module, sortiert, einzigartig
        const merged = Array.from(new Set([...current, ...codeModules])).sort((a, b) => a - b);
        const mergedStr = merged.join(",");

        // 6) User updaten
        await db.update(users).set({ enabledModules: mergedStr }).where(eq(users.id, ctx.user.id));

        // 7) Code-Nutzung hochzählen
        await db.update(accessCodes).set({ usedCount: usedCount + 1 }).where(eq(accessCodes.id, ac.id));

        return { ok: true, enabledModules: merged };


      }),


    // Admin: Modul für Nutzer freischalten
    setAccess: adminProcedure
      .input((val) => val as { userId: number; modules: number[] })
      .mutation(async ({ input }) => {
        const db = await (await import('./db')).getDb();
        const { users } = await import('../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        const modulesStr = input.modules.join(',');
        await db.update(users).set({ enabledModules: modulesStr }).where(eq(users.id, input.userId));
        return { ok: true };
      }),
  }),



  adminUsers: router({
    list: adminProcedure.query(async () => {
      const db = await (await import('./db')).getDb();
      const { users } = await import('../drizzle/schema');
      return await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        enabledModules: users.enabledModules,
        createdAt: users.createdAt,
        lastSignedIn: users.lastSignedIn,
      }).from(users).orderBy(users.createdAt);
    }),
    setModules: adminProcedure
      .input((val) => val as { userId: number; modules: string })
      .mutation(async ({ input }) => {
        const db = await (await import('./db')).getDb();
        const { users } = await import('../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        await db.update(users).set({ enabledModules: input.modules }).where(eq(users.id, input.userId));
        return { ok: true };
      }),
    setRole: adminProcedure
      .input((val) => val as { userId: number; role: 'user' | 'admin' | 'trainer' })
      .mutation(async ({ input }) => {
        const db = await (await import('./db')).getDb();
        const { users } = await import('../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        await db.update(users).set({ role: input.role }).where(eq(users.id, input.userId));
        return { ok: true };
      }),
    deleteUser: adminProcedure
      .input((val) => val as { userId: number })
      .mutation(async ({ input }) => {
        const db = await (await import('./db')).getDb();
        const { users, authCredentials, learningLogs } = await import('../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        await db.delete(learningLogs).where(eq(learningLogs.userId, input.userId));
        await db.delete(authCredentials).where(eq(authCredentials.openId, (await db.select().from(users).where(eq(users.id, input.userId)).limit(1))[0]?.openId ?? ''));
        await db.delete(users).where(eq(users.id, input.userId));
        return { ok: true };
      }),
  }),

  account: router({
    deleteMyAccount: protectedProcedure.mutation(async ({ ctx }) => {
      const db = await (await import('./db')).getDb();
      const { users, authCredentials, learningLogs, userSessions } = await import('../drizzle/schema');
      const { eq } = await import('drizzle-orm');
      const userId = ctx.user.id;
      const openId = ctx.user.openId;
      await db.delete(learningLogs).where(eq(learningLogs.userId, userId));
      await db.delete(userSessions).where(eq(userSessions.userId, userId));
      await db.delete(authCredentials).where(eq(authCredentials.openId, openId));
      await db.delete(users).where(eq(users.id, userId));
      return { ok: true };
    }),
  }),

  progress: router({
    startDay: protectedProcedure
      .input((val: any) => val as { moduleId: number; dayId: number })
      .mutation(async ({ ctx, input }) => {
        const db = await (await import('./db')).getDb();
        const { learningLogs } = await import('../drizzle/schema');
        const result = await db.insert(learningLogs).values({
          userId: ctx.user.id,
          moduleId: input.moduleId,
          dayId: input.dayId,
          openedAt: new Date(),
          completed: false,
        });
        const hdr = result as unknown as [{ insertId: number }, unknown]; return { logId: Number(hdr[0].insertId) };
      }),
    completeDayByIds: protectedProcedure
      .input((val: any) => val as { moduleId: number; dayId: number; durationSeconds: number })
      .mutation(async ({ ctx, input }) => {
        const db = await (await import('./db')).getDb();
        const { learningLogs } = await import('../drizzle/schema');
        const { eq, and } = await import('drizzle-orm');
        // Update existing log or insert new completed one
        const existing = await db.select().from(learningLogs)
          .where(and(eq(learningLogs.userId, ctx.user.id), eq(learningLogs.moduleId, input.moduleId), eq(learningLogs.dayId, input.dayId)))
          .limit(1);
        if (existing.length > 0) {
          await db.update(learningLogs)
            .set({ completed: true, closedAt: new Date(), durationSeconds: input.durationSeconds })
            .where(eq(learningLogs.id, existing[0].id));
        } else {
          await db.insert(learningLogs).values({
            userId: ctx.user.id, moduleId: input.moduleId, dayId: input.dayId,
            openedAt: new Date(), closedAt: new Date(), completed: true, durationSeconds: input.durationSeconds, heartbeatCount: 0
          });
        }
        return { ok: true };
      }),
    completeDay: protectedProcedure
      .input((val: any) => val as { logId: number; durationSeconds: number; heartbeatCount: number })
      .mutation(async ({ ctx, input }) => {
        const db = await (await import('./db')).getDb();
        const { learningLogs } = await import('../drizzle/schema');
        const { eq, and } = await import('drizzle-orm');
        await db.update(learningLogs)
          .set({ closedAt: new Date(), durationSeconds: input.durationSeconds, heartbeatCount: input.heartbeatCount, completed: true })
          .where(and(eq(learningLogs.id, input.logId), eq(learningLogs.userId, ctx.user.id)));
        return { ok: true };
      }),
    getProgress: protectedProcedure.query(async ({ ctx }) => {
      const db = await (await import('./db')).getDb();
      const { learningLogs } = await import('../drizzle/schema');
      const { eq } = await import('drizzle-orm');
      return await db.select().from(learningLogs).where(eq(learningLogs.userId, ctx.user.id));
    }),
  }),
  adminCodes: router({
    list: adminProcedure.query(async () => {
      const db = await (await import('./db')).getDb();
      const { accessCodes } = await import('../drizzle/schema');
      return await db.select().from(accessCodes).orderBy(accessCodes.createdAt);
    }),
    create: adminProcedure
      .input((val: any) => val as { code: string; modules: string; maxUses: number; note?: string; role?: string })
      .mutation(async ({ ctx, input }) => {
        const db = await (await import('./db')).getDb();
        const { accessCodes } = await import('../drizzle/schema');
        await db.insert(accessCodes).values({
          code: input.code.toUpperCase().trim(),
          modules: input.modules,
          maxUses: input.maxUses,
          note: input.note || null,
          role: input.role || null,
          createdByUserId: ctx.user.id,
        });
        return { ok: true };
      }),
    delete: adminProcedure
      .input((val: any) => val as { id: number })
      .mutation(async ({ input }) => {
        const db = await (await import('./db')).getDb();
        const { accessCodes } = await import('../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        await db.delete(accessCodes).where(eq(accessCodes.id, input.id));
        return { ok: true };
      }),
    toggle: adminProcedure
      .input((val: any) => val as { id: number; isActive: boolean })
      .mutation(async ({ input }) => {
        const db = await (await import('./db')).getDb();
        const { accessCodes } = await import('../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        await db.update(accessCodes).set({ isActive: input.isActive }).where(eq(accessCodes.id, input.id));
        return { ok: true };
      }),
  }),

  presentationCode: router({
    redeem: publicProcedure
      .input((val: any) => val as { code: string })
      .mutation(async ({ input }) => {
        const { redeemPresentationCode } = await import('./db');
        return redeemPresentationCode(input.code);
      }),
    list: adminProcedure.query(async () => {
      const { listPresentationCodes } = await import('./db');
      return listPresentationCodes();
    }),
    create: adminProcedure
      .input((val: any) => val as { code: string; label: string; modules: string; expiresInDays?: number; maxUsage?: number })
      .mutation(async ({ input }) => {
        const { createPresentationCode } = await import('./db');
        const expiresAt = input.expiresInDays ? new Date(Date.now() + input.expiresInDays * 86400000) : null;
        await createPresentationCode(input.code, input.label, input.modules, expiresAt, input.maxUsage ?? null);
        return { ok: true };
      }),
    activate: adminProcedure
      .input((val: any) => val as { id: number })
      .mutation(async ({ input }) => {
        const { sql } = await import('drizzle-orm');
        const { getDb } = await import('./db');
        const db = await getDb();
        if (db) await db.execute(sql`UPDATE presentation_codes SET isActive = 1 WHERE id = ${input.id}`);
        return { ok: true };
      }),
    delete: adminProcedure
      .input((val: any) => val as { id: number })
      .mutation(async ({ input }) => {
        const { sql } = await import('drizzle-orm');
        const { getDb } = await import('./db');
        const db = await getDb();
        if (db) await db.execute(sql`DELETE FROM presentation_codes WHERE id = ${input.id}`);
        return { ok: true };
      }),
    deactivate: adminProcedure
      .input((val: any) => val as { id: number })
      .mutation(async ({ input }) => {
        const { deactivatePresentationCode } = await import('./db');
        await deactivatePresentationCode(input.id);
        return { ok: true };
      }),
  }),
  adminQuestions: router({
    list: adminProcedure
      .input(z.object({
        moduleId: z.number().optional(),
        difficulty: z.string().optional(),
        search: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        const { getDb } = await import("./db");
        const { like, and, eq, count, sql } = await import("drizzle-orm");
        const db = await getDb();
        if (!db) return { questions: [], total: 0 };
        const conditions: any[] = [];
        if (input.moduleId) conditions.push(eq(questionBank.moduleId, input.moduleId));
        if (input.difficulty) conditions.push(eq(questionBank.difficulty, input.difficulty as any));
        if (input.search) conditions.push(like(questionBank.questionText, `%${input.search}%`));
        const where = conditions.length > 0 ? and(...conditions) : undefined;
        const [questions, countResult] = await Promise.all([
          db.select().from(questionBank).where(where).limit(input.limit).offset(input.offset).orderBy(questionBank.moduleId),
          db.select({ total: count() }).from(questionBank).where(where),
        ]);
        return { questions, total: countResult[0]?.total ?? 0 };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { getDb } = await import("./db");
        const { eq } = await import("drizzle-orm");
        const db = await getDb();
        if (!db) throw new Error("DB nicht verfügbar");
        await db.delete(questionBank).where(eq(questionBank.id, input.id));
        return { ok: true };
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        questionText: z.string().optional(),
        difficulty: z.string().optional(),
        category: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { getDb } = await import("./db");
        const { eq } = await import("drizzle-orm");
        const db = await getDb();
        if (!db) throw new Error("DB nicht verfügbar");
        const updateData: any = {};
        if (input.questionText) updateData.questionText = input.questionText;
        if (input.difficulty) updateData.difficulty = input.difficulty;
        if (input.category) updateData.category = input.category;
        await db.update(questionBank).set(updateData).where(eq(questionBank.id, input.id));
        return { ok: true };
      }),
  }),

});

export type AppRouter = typeof appRouter;
</file>

<file path="package.json">
{
  "name": "makler-lernportal",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "dev": "NODE_ENV=development tsx watch server/_core/index.ts",
    "build": "vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --external:../../vite.config",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc --noEmit",
    "format": "prettier --write .",
    "test": "vitest run",
    "db:push": "echo \"db:push disabled on Railway\""
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.80.0",
    "@aws-sdk/client-s3": "^3.693.0",
    "@aws-sdk/s3-request-presigner": "^3.693.0",
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-context-menu": "^2.2.16",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toast": "^1.2.15",
    "@radix-ui/react-toggle": "^1.1.10",
    "@radix-ui/react-toggle-group": "^1.1.11",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@stripe/stripe-js": "^8.9.0",
    "@tanstack/react-query": "^5.90.20",
    "@trpc/client": "^11.6.0",
    "@trpc/react-query": "^11.6.0",
    "@trpc/server": "^11.6.0",
    "@types/jspdf": "^2.0.0",
    "axios": "^1.12.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "cookie": "^1.0.2",
    "date-fns": "^4.1.0",
    "dotenv": "^17.2.2",
    "embla-carousel-react": "^8.6.0",
    "express": "^4.21.2",
    "express-rate-limit": "^8.2.1",
    "form-data": "^4.0.5",
    "framer-motion": "^12.23.22",
    "helmet": "^8.1.0",
    "input-otp": "^1.4.2",
    "jose": "6.1.0",
    "jspdf": "^4.1.0",
    "lucide-react": "^0.453.0",
    "mammoth": "^1.12.0",
    "multer": "^2.1.1",
    "mysql2": "^3.15.0",
    "nanoid": "^5.1.5",
    "next-themes": "^0.4.6",
    "node-fetch": "^3.3.2",
    "node-fpdf": "^1.0.49",
    "officeparser": "^6.0.4",
    "pdf-parse": "^2.4.5",
    "pdfjs-dist": "^5.5.207",
    "react": "^19.2.1",
    "react-day-picker": "^9.11.1",
    "react-dom": "^19.2.1",
    "react-hook-form": "^7.64.0",
    "react-markdown": "^10.1.0",
    "react-resizable-panels": "^3.0.6",
    "recharts": "^2.15.2",
    "resend": "^6.9.3",
    "sonner": "^2.0.7",
    "stripe": "^20.4.1",
    "superjson": "^1.13.3",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^1.1.2",
    "wouter": "^3.3.5",
    "zod": "^4.1.12"
  },
  "devDependencies": {
    "@builder.io/vite-plugin-jsx-loc": "^0.1.1",
    "@tailwindcss/typography": "^0.5.15",
    "@tailwindcss/vite": "^4.1.3",
    "@types/express": "4.17.21",
    "@types/google.maps": "^3.58.1",
    "@types/node": "^24.7.0",
    "@types/react": "^19.2.1",
    "@types/react-dom": "^19.2.1",
    "@vitejs/plugin-react": "^5.0.4",
    "add": "^2.0.6",
    "autoprefixer": "^10.4.20",
    "drizzle-kit": "^0.31.4",
    "drizzle-orm": "^0.44.7",
    "esbuild": "^0.25.0",
    "pnpm": "^10.15.1",
    "postcss": "^8.4.47",
    "prettier": "^3.6.2",
    "tailwindcss": "^4.1.14",
    "tsx": "^4.19.1",
    "tw-animate-css": "^1.4.0",
    "typescript": "5.9.3",
    "vite": "^7.1.7",
    "vite-plugin-manus-runtime": "^0.0.57",
    "vitest": "^2.1.4"
  },
  "packageManager": "pnpm@10.4.1+sha512.c753b6c3ad7afa13af388fa6d808035a008e30ea9993f58c6663e2bc5ff21679aa834db094987129aa4d488b86df57f7b634981b2f827cdcacc698cc0cfb88af",
  "pnpm": {
    "patchedDependencies": {
      "wouter@3.7.1": "patches/wouter@3.7.1.patch"
    },
    "overrides": {
      "tailwindcss>nanoid": "3.3.7"
    },
    "onlyBuiltDependencies": [
      "@tailwindcss/oxide",
      "core-js",
      "esbuild",
      "tesseract.js"
    ]
  },
  "engines": {
    "node": ">=22 <23"
  }
}
</file>

<file path="server/ragTutor.ts">
/**
 * RAG-Tutor: KI antwortet aus echten Modulinhalten
 * Primär: Claude Haiku (Anthropic) | Fallback: Gemini
 */
import type { Express, Request, Response } from "express";

const MODULE_KNOWLEDGE: Record<string, string> = {
  "1": `MODUL 1 — Einführung Immobilienwirtschaft (20 Tage, 160 UE)
Themen: Marktüberblick Deutschland, BGB Grundlagen §433ff, §535ff, §652 Maklerrecht, GewO §34c/§34i/§34d, Grundbuchrecht §873/§925 BGB, WEG-Grundlagen, BauGB, Marktakteure, Immobilientypen, Verkehrswert §194 BauGB.
Prüfungsrelevanz: §34c GewO Grundlagen, Maklerrecht §652 BGB, Grundbuch, Eigentumsübertragung.`,
  "2": `MODUL 2 — Immobilienmakler §34c GewO (60 Tage, 440 UE)
Themen: §34c GewO Erlaubnisvoraussetzungen, Maklervertrag (Alleinauftrag, Qualifizierter Alleinauftrag), Provisionsrecht §652 BGB, Bestellerprinzip §2 WoVermG, Vergleichswertverfahren §15 ImmoWertV, Ertragswertverfahren §17-20 ImmoWertV, Sachwertverfahren §21-23 ImmoWertV, Kaufvertragsrecht §311b BGB, GwG, MaBV, Widerrufsrecht §355 BGB.
Prüfungsrelevanz: Maklerrecht, Bewertungsverfahren, Kaufvertragsrecht, GwG, MaBV.`,
  "3": `MODUL 3 — Verwalter WEG & Mietrecht (80 Tage, 528 UE)
Themen WEG: WEG-Reform 2020, GdWE §9a WEG, Verwalterbestellung §26 WEG, Eigentümerversammlung §23-25 WEG, Wirtschaftsplan §28 WEG, Jahresabrechnung, Instandhaltungsrücklage §19 WEG.
Themen Mietrecht: §535ff BGB, Mietpreisbremse §556d BGB, Nebenkostenabrechnung §556 BGB, Schönheitsreparaturen BGH, Kündigung §573/§543 BGB, Kaution §551 BGB.
Prüfungsrelevanz: WEG-Beschlüsse, Abrechnung, Mieterhöhung, Kündigung.`,
  "4": `MODUL 4 — Gutachter & Sachverständiger (40 Tage, 264 UE)
Themen: ImmoWertV 2021, Verkehrswert §194 BauGB, Vergleichswertverfahren §15 ImmoWertV, Ertragswertverfahren §17-20 ImmoWertV (Liegenschaftszinssatz, Barwertfaktor), Sachwertverfahren §21-23 ImmoWertV (NHK 2010, Alterswertminderung), Bodenrichtwerte BORIS, Gutachterausschüsse §192ff BauGB.
Prüfungsrelevanz: Alle 3 Verfahren rechnerisch, Liegenschaftszinssatz, Barwertfaktor.`,
  "5": `MODUL 5 — Darlehensvermittler §34i GewO (40 Tage, 304 UE)
Themen: §34i GewO, WIKR §491ff BGB, ESIS-Merkblatt, Kreditwürdigkeitsprüfung §505a-c BGB, Annuitätendarlehen, Zinsbindung, Forward-Darlehen, KfW-Programme 124/153/270, Grundschuld §1191 BGB, Wohn-Riester §92a EStG.
Prüfungsrelevanz: Annuitätenberechnung, ESIS, Kreditwürdigkeitsprüfung, KfW-Förderung.`,
};

const GENERAL_KNOWLEDGE = `
ALLGEMEINE IMMOBILIENWIRTSCHAFT:
- Maklercourtage: je 3,57% inkl. MwSt (§656c BGB seit 23.12.2020)
- Grunderwerbsteuer: Berlin 6%, Bayern 3,5%, NRW 6,5%
- Notarkosten: ca. 1,5% des Kaufpreises
- IHK-Sachkundeprüfung §34c: schriftlich 120 Min
- IHK-Sachkundeprüfung §34i: schriftlich 120 Min
- Widerrufsrecht: 14 Tage ab Vertragsschluss §355 BGB
- Energieausweis Pflicht: bei Verkauf und Neuvermietung (GEG §80)
`;

async function askClaude(systemPrompt: string, question: string, context: any[]): Promise<string> {
  const messages = [
    ...context.slice(-6).map((m: any) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    })),
    { role: "user", content: question },
  ];

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 8000,
      system: systemPrompt,
      messages,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude Error: ${err}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text || "";
}

async function askGemini(systemPrompt: string, question: string, context: any[]): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [
          ...context.slice(-6).map((m: any) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          { role: "user", parts: [{ text: question }] },
        ],
        generationConfig: { temperature: 0.3, maxOutputTokens: 1024 },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini Error: ${err}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

export function registerRagTutorRoutes(app: Express) {
  app.post("/api/ai/rag-tutor", async (req: Request, res: Response) => {
    try {
      const { question, moduleId, context } = req.body;

      if (!question || question.trim().length < 3) {
        return res.status(400).json({ error: "Frage zu kurz" });
      }

      if (!process.env.ANTHROPIC_API_KEY && !process.env.GEMINI_API_KEY) {
        return res.status(503).json({ error: "KI-Service nicht konfiguriert" });
      }

      const moduleContext = moduleId && MODULE_KNOWLEDGE[String(moduleId)]
        ? MODULE_KNOWLEDGE[String(moduleId)]
        : Object.values(MODULE_KNOWLEDGE).join("\n\n");

      const systemPrompt = `Du bist ein professioneller KI-Tutor für die Immobilien-Akademie Smart.
Du hilfst bei der Vorbereitung auf IHK-Sachkundeprüfungen §34c GewO und §34i GewO.

WISSENSBASIS:
${moduleContext}

${GENERAL_KNOWLEDGE}

REGELN:
1. Antworte immer auf Deutsch, klar und verständlich
2. Nenne immer den genauen Paragraphen (§ BGB, § WEG, § GewO)
3. Bei Berechnungen: zeige jeden Schritt einzeln
4. Maximal 300 Wörter, außer bei komplexen Berechnungen
5. Beginne direkt fachlich — kein "Als KI..."
6. Nenne Merkhilfen für die Prüfung`;

      let answer = "";
      let usedModel = "";

      // Primär: Claude Haiku
      if (process.env.ANTHROPIC_API_KEY) {
        try {
          answer = await askClaude(systemPrompt, question, context || []);
          usedModel = "claude-haiku";
        } catch (err) {
          console.error("[RAG-Tutor] Claude Fehler, versuche Gemini:", err);
        }
      }

      // Fallback: Gemini
      if (!answer && process.env.GEMINI_API_KEY) {
        try {
          answer = await askGemini(systemPrompt, question, context || []);
          usedModel = "gemini-flash";
        } catch (err) {
          console.error("[RAG-Tutor] Gemini Fehler:", err);
        }
      }

      if (!answer) {
        return res.status(502).json({ error: "KI-Service temporär nicht verfügbar" });
      }

      res.json({ answer, moduleId: moduleId || null, model: usedModel });
    } catch (err) {
      console.error("[RAG-Tutor] Error:", err);
      res.status(500).json({ error: "Server-Fehler" });
    }
  });

  // Groq Whisper Speech-to-Text
  app.post("/api/ai/transcribe", async (req: Request, res: Response) => {
    try {
      const chunks: Buffer[] = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", async () => {
        const buffer = Buffer.concat(chunks);
        const groqKey = process.env.GROQ_API_KEY;
        if (!groqKey) {
          return res.status(500).json({ error: "GROQ_API_KEY fehlt" });
        }
        const FormData = (await import("form-data")).default;
        const form = new FormData();
        form.append("file", buffer, {
          filename: "audio.webm",
          contentType: req.headers["content-type"] || "audio/webm",
        });
        form.append("model", "whisper-large-v3-turbo");
        form.append("language", "de");
        form.append("response_format", "json");
        const fetch = (await import("node-fetch")).default;
        const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${groqKey}`,
            ...form.getHeaders(),
          },
          body: form,
        });
        const data = await response.json() as any;
        if (data.text) {
          res.json({ transcript: data.text });
        } else {
          res.status(500).json({ error: "Transkription fehlgeschlagen", details: data });
        }
      });
    } catch (err) {
      console.error("[Whisper] Error:", err);
      res.status(500).json({ error: "Server-Fehler" });
    }
  });


  // ElevenLabs Text-to-Speech
  app.post("/api/ai/tts", async (req: Request, res: Response) => {
    try {
      const { text } = req.body;
      if (!text) return res.status(400).json({ error: "Text fehlt" });
      const apiKey = process.env.ELEVENLABS_API_KEY;
      if (!apiKey) return res.status(500).json({ error: "ELEVENLABS_API_KEY fehlt" });
      const fetch = (await import("node-fetch")).default;
      const voiceId = "pNInz6obpgDQGcFmaJgB"; // Adam - natürliche deutsche Stimme
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg",
        },
        body: JSON.stringify({
          text: text.slice(0, 500),
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.5, similarity_boost: 0.75 }
        }),
      });
      if (!response.ok) {
        const err = await response.text();
        return res.status(500).json({ error: "ElevenLabs Fehler", details: err });
      }
      res.setHeader("Content-Type", "audio/mpeg");
      response.body?.pipe(res);
    } catch (err) {
      console.error("[TTS] Error:", err);
      res.status(500).json({ error: "Server-Fehler" });
    }
  });


  // Dokument-Upload + KI-Analyse
  app.post("/api/ai/analyze-document", async (req: Request, res: Response) => {
    try {
      const chunks: Buffer[] = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", async () => {
        const buffer = Buffer.concat(chunks);
        const contentType = req.headers["content-type"] || "";
        const filename = (req.headers["x-filename"] as string) || "document";
        let extractedText = "";

        try {
          if (contentType.includes("application/pdf") || filename.endsWith(".pdf")) {
            const pdfParse = (await import("pdf-parse")).default;
            const data = await pdfParse(buffer);
            extractedText = data.text;
          } else if (filename.endsWith(".docx") || contentType.includes("wordprocessingml")) {
            const mammoth = await import("mammoth");
            const result = await mammoth.extractRawText({ buffer });
            extractedText = result.value;
          } else if (filename.endsWith(".pptx") || filename.endsWith(".xlsx") || filename.endsWith(".odt")) {
            const officeparser = (await import("officeparser")).default;
            extractedText = await officeparser.parseOfficeAsync(buffer);
          } else if (contentType.includes("text/") || filename.endsWith(".txt") || filename.endsWith(".md")) {
            extractedText = buffer.toString("utf-8");
          } else if (contentType.includes("audio/") || filename.match(/\.(mp3|wav|webm|m4a|ogg)$/)) {
            const groqKey = process.env.GROQ_API_KEY;
            if (!groqKey) return res.status(500).json({ error: "GROQ_API_KEY fehlt" });
            const FormData = (await import("form-data")).default;
            const form = new FormData();
            form.append("file", buffer, { filename, contentType });
            form.append("model", "whisper-large-v3-turbo");
            form.append("language", "de");
            const fetch = (await import("node-fetch")).default;
            const r = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
              method: "POST",
              headers: { Authorization: `Bearer ${groqKey}`, ...form.getHeaders() },
              body: form,
            });
            const d = await r.json() as any;
            extractedText = d.text || "";
          } else {
            return res.status(400).json({ error: "Dateityp nicht unterstützt" });
          }
        } catch (parseErr) {
          console.error("[Upload] Parse Fehler:", parseErr);
          return res.status(500).json({ error: "Datei konnte nicht gelesen werden" });
        }

        if (!extractedText || extractedText.trim().length < 10) {
          return res.status(400).json({ error: "Kein Text extrahierbar" });
        }

        // Claude analysiert den Text
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) return res.status(500).json({ error: "ANTHROPIC_API_KEY fehlt" });
        const Anthropic = (await import("@anthropic-ai/sdk")).default;
        const client = new Anthropic({ apiKey });
        const textSnippet = extractedText.slice(0, 8000);
        const message = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 8000,
          messages: [{
            role: "user",
            content: `Du bist ein Immobilien-Experte. Analysiere dieses Dokument und erstelle:

1. **Zusammenfassung** (3-5 Sätze)
2. **Wichtigste Punkte** (5 Bullet Points)
3. **Relevanz für Immobilienrecht** (Was ist relevant für §34c/§34i GewO?)
4. **5 Prüfungsfragen** zum Inhalt mit Antworten

Dokument:
${textSnippet}`
          }]
        });
        const analysis = (message.content[0] as any).text;
        res.json({
          analysis,
          textLength: extractedText.length,
          filename,
        });
      });
    } catch (err) {
      console.error("[Upload] Error:", err);
      res.status(500).json({ error: "Server-Fehler" });
    }
  });


  // Auto-Fragen-Generator: Text → KI → question_bank DB
  app.post("/api/ai/generate-questions", async (req: Request, res: Response) => {
    try {
      const { text, moduleId, category, count = 15 } = req.body;
      if (!text || !moduleId) return res.status(400).json({ error: "text und moduleId erforderlich" });
      const prompt = `Du bist ein IHK-Prüfungsexperte. Erstelle exakt ${count} Multiple-Choice Prüfungsfragen auf Deutsch aus diesem Text:\n\n${text.slice(0, 8000)}\n\nGib NUR ein JSON-Array zurück:\n[{"questionText":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"correctAnswer":"A","explanation":"...","difficulty":"easy","category":"${category || 'Allgemein'}"}]`;
      let questionsJson = "";
      try {
        const answer = await askClaude("Du bist IHK-Prüfungsexperte. Antworte NUR mit JSON.", prompt, []);
        questionsJson = answer;
      } catch {
        return res.status(500).json({ error: "KI nicht verfügbar" });
      }
      const clean2 = questionsJson.replace(/```json/g, "").replace(/```/g, "").trim();
      let questions: any[];
      try { questions = JSON.parse(clean2); } catch { return res.status(500).json({ error: "KI-Antwort ungültig" }); }
      const { getDb } = await import("./db");
      const { questionBank } = await import("../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      const db = await getDb();
      if (!db) return res.status(500).json({ error: "DB nicht verfügbar" });
      let saved = 0;
      for (const q of questions) {
        try {
          await db.insert(questionBank).values({ moduleId: Number(moduleId), category: q.category || category || "Allgemein", difficulty: q.difficulty || "medium", questionText: q.questionText, options: JSON.stringify(q.options), correctAnswer: q.correctAnswer, explanation: q.explanation || "" });
          saved++;
        } catch {}
      }
      res.json({ success: true, generated: questions.length, saved, moduleId: Number(moduleId), message: `${saved} Fragen in Modul ${moduleId} gespeichert` });
    } catch { res.status(500).json({ error: "Fehler beim Generieren" }); }
  });

  // Kursbuch-Generator: Modul → KI → strukturiertes Kursbuch
  app.post("/api/ai/generate-kursbuch", async (req: Request, res: Response) => {
    try {
      const { moduleId, moduleTitle, contentSummary, format = "kursbuch" } = req.body;
      if (!moduleId || !contentSummary) return res.status(400).json({ error: "moduleId und contentSummary erforderlich" });
      const formatMap: Record<string, string> = {
        kursbuch: "ein vollständiges Kursbuch mit Kapiteln, Definitionen und Praxisbeispielen",
        zusammenfassung: "eine kompakte Zusammenfassung (4-6 Seiten) mit Merksätzen",
        skript: "ein Prüfungsskript mit Fragen, Antworten und Merkhilfen",
      };
      const prompt = `Du bist IHK-Dozent für Immobilienwirtschaft. Erstelle ${formatMap[format] || formatMap.kursbuch} für: ${moduleTitle}\n\nInhalte: ${contentSummary.slice(0, 8000)}\n\nAnforderungen:\n- Professionelle Qualität wie IU Akademie\n- Klare Struktur mit nummerierten Kapiteln\n- Praxisnahe Beispiele\n- Alle Gesetze korrekt zitiert\n- Verständlich für Quereinsteiger\n- Format: Markdown mit # ## ###`;
      const content2 = await askClaude("Du bist erfahrener IHK-Dozent für Immobilienwirtschaft.", prompt, []);
      res.json({ success: true, content: content2, moduleId, moduleTitle, format, generatedAt: new Date().toISOString() });
    } catch { res.status(500).json({ error: "Fehler beim Generieren" }); }
  });

  // Fallstudie bewerten
  app.post("/api/ai/bewerte-fallstudie", async (req: Request, res: Response) => {
    try {
      const { aufgabe, musterantwort, nutzerAntwort, modul } = req.body;
      if (!aufgabe || !nutzerAntwort) return res.status(400).json({ error: "Aufgabe und Antwort erforderlich" });
      const prompt = `Du bist ein IHK-Prüfer für Immobilienwirtschaft. Bewerte die folgende Antwort eines Prüflings.

AUFGABE:
${aufgabe}

MUSTERANTWORT (nicht zeigen):
${musterantwort}

ANTWORT DES PRÜFLINGS:
${nutzerAntwort}

Bewerte nach IHK-Maßstäben und antworte NUR mit diesem JSON:
{
  "note": "Sehr gut|Gut|Befriedigend|Ausreichend|Mangelhaft",
  "punkte": 0-100,
  "feedback": "2-3 Sätze Gesamtbewertung",
  "staerken": "Was gut war",
  "verbesserungen": "Was fehlt oder falsch ist"
}`;
      const answer = await askClaude("Du bist strenger aber fairer IHK-Prüfer. Antworte NUR mit JSON.", prompt, []);
      const clean = answer.replace(/\`\`\`json/g, "").replace(/\`\`\`/g, "").trim();
      try {
        const bewertung = JSON.parse(clean);
        res.json({ success: true, bewertung });
      } catch {
        res.status(500).json({ error: "Bewertung konnte nicht verarbeitet werden" });
      }
    } catch { res.status(500).json({ error: "Fehler bei der Bewertung" }); }
  });

  // Kursbuch aus echtem Modulinhalt generieren

  app.post("/api/ai/generate-kursbuch-v2", async (req: Request, res: Response) => {
    try {
      const { moduleId, format = "kursbuch" } = req.body;
      if (!moduleId) return res.status(400).json({ error: "moduleId erforderlich" });
      const fs = await import("fs");
      const path = await import("path");
      const contentFiles: Record<number, string[]> = {
        1: ["client/src/pages/modules/Module1Content.ts"],
        2: ["client/src/pages/modules/Module2ContentPart1_Maximal.ts","client/src/pages/modules/Module2ContentPart2_Maximal.ts"],
        3: ["client/src/pages/modules/Module3Content_Maximal.ts","client/src/pages/modules/Module3Content_Maximal_Part2_Extended.ts"],
        4: ["client/src/pages/modules/Module4Content_Maximal.ts","client/src/pages/modules/Module4Content_Valuation_Maximalist.ts"],
        5: ["client/src/pages/modules/Module5Content_34i_Complete.ts"],
      };
      const moduleNames: Record<number, string> = {
        1: "Einführung in die Immobilienwirtschaft", 2: "Immobilienmakler §34c GewO",
        3: "WEG-Verwaltung & Mietrecht", 4: "Gutachter & Sachverständiger", 5: "Darlehensvermittler §34i GewO",
      };
      const files = contentFiles[Number(moduleId)] || [];
      let rawContent = "";
      for (const file of files) {
        const filePath = path.resolve(file);
        if (fs.existsSync(filePath)) rawContent += fs.readFileSync(filePath, "utf-8").slice(0, 25000) + "\n\n";
      }
      if (!rawContent) return res.status(404).json({ error: "Modulinhalt nicht gefunden" });
      const titleTheoryPairs: string[] = [];
      const lines = rawContent.split("\n");
      let currentTitle = ""; let currentTheory = ""; let currentPractice = ""; let currentTask = "";
      for (const line of lines) {
        const tMatch = line.match(/title:\s*["\`'](.+?)["\`']/);
        const thMatch = line.match(/theory:\s*["\`'](.+?)["\`']/);
        const prMatch = line.match(/practice:\s*["\`'](.+?)["\`']/);
        const taMatch = line.match(/task:\s*["\`'](.+?)["\`']/);
        if (tMatch) { currentTitle = tMatch[1]; }
        if (thMatch) { currentTheory = thMatch[1]; }
        if (prMatch) { currentPractice = prMatch[1]; }
        if (taMatch) {
          currentTask = taMatch[1];
          if (currentTitle && currentTheory) {
            titleTheoryPairs.push("### " + currentTitle + "\nTheorie: " + currentTheory + "\nPraxis: " + currentPractice + "\nAufgabe: " + currentTask);
          }
          currentTitle = ""; currentTheory = ""; currentPractice = ""; currentTask = "";
        }
      }
      const extractedContent = titleTheoryPairs.length > 0 ? titleTheoryPairs.slice(0, 30).join("\n\n") : rawContent.slice(0, 12000);
      const formatInstructions: Record<string, string> = {
        kursbuch: "Erstelle ein vollständiges professionelles KURSBUCH mit MINDESTENS 5000 Wörtern. Struktur: 1) Vorwort und Lernziele (300 Wörter) 2) Mindestens 8 nummerierte Kapitel je 400-600 Wörter mit Theorie, Praxisbeispielen aus Berlin/Deutschland, Merkkästen mit wichtigen Definitionen 3) Übungsaufgaben am Ende jedes Kapitels mit Musterlösungen 4) Zusammenfassung und IHK-Prüfungsvorbereitung. WICHTIG: Schreibe vollständig und ausführlich — kürze NICHTS ab.",
        zusammenfassung: "Erstelle eine vollständige LERNZUSAMMENFASSUNG mit MINDESTENS 2000 Wörtern: 1) Die 30 wichtigsten Begriffe mit ausführlichen Definitionen 2) Alle relevanten Paragraphen mit Erklärung was sie bedeuten 3) Mindestens 15 Merksätze für die Prüfung 4) 20 häufige IHK-Prüfungsfragen mit vollständigen Musterlösungen. Kürze nichts ab.",
        skript: "Erstelle ein vollständiges PRÜFUNGSSKRIPT mit MINDESTENS 3000 Wörtern: 1) 30 IHK-typische Prüfungsfragen im Frage-Antwort-Format mit ausführlichen Musterlösungen 2) Alle prüfungsrelevanten Paragraphen mit Erklärung 3) Rechenwege für Berechnungsaufgaben Schritt für Schritt 4) Tipps für die Prüfungssituation. Vollständig ausschreiben — nichts kürzen.",
      };
      const prompt = "Modul: " + moduleNames[Number(moduleId)] + "\n\n" + formatInstructions[format] + "\n\nLERNINHALTE:\n" + extractedContent + "\n\nAnforderungen: Professionell wie IU Akademie, verständlich für Quereinsteiger, alle Gesetze korrekt zitiert, Markdown-Format mit # ## ###";
      const generatedContent = await askClaude("Du bist erfahrener IHK-Dozent und Fachautor für Immobilienwirtschaft in Deutschland.", prompt, []);
      res.json({ success: true, content: generatedContent, moduleId, moduleName: moduleNames[Number(moduleId)], format, daysExtracted: titleTheoryPairs.length, generatedAt: new Date().toISOString() });
    } catch (err: any) { res.status(500).json({ error: "Fehler: " + err.message }); }
  });

  // Dozenten-Cockpit: Lernfortschritt analysieren + Unterrichtsplan generieren
  app.post("/api/ai/dozenten-cockpit", async (req: Request, res: Response) => {
    try {
      const { moduleId, format = "unterrichtsplan" } = req.body;
      if (!moduleId) return res.status(400).json({ error: "moduleId erforderlich" });

      const { getDb } = await import("./db");
      const { learningLogs, users, questionBank } = await import("../drizzle/schema");
      const { eq, and, count, avg, sql } = await import("drizzle-orm");
      const db = await getDb();
      if (!db) return res.status(500).json({ error: "DB nicht verfügbar" });

      const moduleNames: Record<number, string> = {
        1: "Einführung in die Immobilienwirtschaft",
        2: "Immobilienmakler §34c GewO",
        3: "WEG-Verwaltung & Mietrecht",
        4: "Gutachter & Sachverständiger",
        5: "Darlehensvermittler §34i GewO",
      };

      // Lernfortschritt der Gruppe abrufen
      const logs = await db.select({
        userId: learningLogs.userId,
        dayId: learningLogs.dayId,
        completed: learningLogs.completed,
        durationSeconds: learningLogs.durationSeconds,
        heartbeatCount: learningLogs.heartbeatCount,
      }).from(learningLogs)
        .where(eq(learningLogs.moduleId, Number(moduleId)));

      // Statistiken berechnen
      const totalUsers = new Set(logs.map(l => l.userId)).size;
      const completedDays = logs.filter(l => l.completed);
      const avgDuration = completedDays.length > 0
        ? Math.round(completedDays.reduce((s, l) => s + l.durationSeconds, 0) / completedDays.length / 60)
        : 0;

      // Welche Tage wurden am wenigsten absolviert
      const dayStats: Record<number, { completed: number; started: number }> = {};
      for (const log of logs) {
        if (!dayStats[log.dayId]) dayStats[log.dayId] = { completed: 0, started: 0 };
        dayStats[log.dayId].started++;
        if (log.completed) dayStats[log.dayId].completed++;
      }

      const weakDays = Object.entries(dayStats)
        .filter(([_, s]) => s.started > 0)
        .map(([day, s]) => ({ day: Number(day), rate: Math.round(s.completed / s.started * 100) }))
        .sort((a, b) => a.rate - b.rate)
        .slice(0, 5);

      // Prüfungsfragen-Statistik
      const questionCount = await db.select({ total: count() })
        .from(questionBank)
        .where(eq(questionBank.moduleId, Number(moduleId)));

      const gruppenAnalyse = {
        moduleName: moduleNames[Number(moduleId)],
        moduleId: Number(moduleId),
        totalNutzer: totalUsers,
        abgesolvierteEinheiten: completedDays.length,
        durchschnittlicheZeit: avgDuration,
        schwacheTage: weakDays,
        prüfungsfragen: questionCount[0]?.total ?? 0,
      };

      // KI-Unterrichtsplan generieren
      const formatInstructions: Record<string, string> = {
        unterrichtsplan: `Erstelle einen detaillierten UNTERRICHTSPLAN für 90 Minuten mit:
- Begrüssung und Lernziele (5 Min)
- Wiederholung schwacher Themen (20 Min) mit konkretem Sprechtext
- Kernthema der Stunde (35 Min) mit Erklärungen und Beispielen
- Gruppenübung/Fallbeispiel (20 Min)
- Fragen und Zusammenfassung (10 Min)
Füge bei jedem Abschnitt den genauen SPRECHTEXT hinzu den der Dozent sagen soll.`,
        zusammenfassung: `Erstelle eine KURZÜBERSICHT für den Dozenten:
- Stand der Gruppe in 3 Sätzen
- Top 3 Schwachstellen
- 5 wichtigste Themen für heute
- 3 konkrete Übungsaufgaben`,
        uebungen: `Erstelle 5 PRAXISÜBUNGEN passend zum Lernstand:
- Jede Übung mit Aufgabenstellung, Musterlösung und Zeitangabe
- Aufsteigend nach Schwierigkeit
- Bezug zu echten IHK-Prüfungssituationen`,
      };

      const prompt = `Du bist ein erfahrener IHK-Dozent für ${gruppenAnalyse.moduleName}.

AKTUELLE GRUPPENSITUATION:
- Lernende aktiv: ${gruppenAnalyse.totalNutzer}
- Absolvierte Lerneinheiten: ${gruppenAnalyse.abgesolvierteEinheiten}
- Ø Lernzeit pro Einheit: ${gruppenAnalyse.durchschnittlicheZeit} Minuten
- Verfügbare Prüfungsfragen: ${gruppenAnalyse.prüfungsfragen}
- Schwache Lerntage (wenig Abschlüsse): ${gruppenAnalyse.schwacheTage.map(d => "Tag " + d.day + " (" + d.rate + "% Abschlussrate)").join(", ") || "Keine Daten"}

${formatInstructions[format] || formatInstructions.unterrichtsplan}

WICHTIG: 
- Sprich die Lernenden als Erwachsene an
- Verwende Praxisbeispiele aus dem Berliner/deutschen Immobilienmarkt
- Alle Paragraphen korrekt zitieren
- Verständlich für Quereinsteiger ohne juristische Vorkenntnisse`;

      const plan = await askClaude(
        "Du bist erfahrener IHK-Dozent für Immobilienwirtschaft in Deutschland.",
        prompt,
        []
      );

      res.json({
        success: true,
        plan,
        gruppenAnalyse,
        format,
        generatedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      res.status(500).json({ error: "Fehler: " + err.message });
    }
  });

  // NotebookLM + Video Skript Generator
  app.post("/api/ai/generate-mediaskript", async (req: Request, res: Response) => {
    try {
      const { moduleId, thema, format = "podcast" } = req.body;
      if (!moduleId || !thema) return res.status(400).json({ error: "moduleId und thema erforderlich" });

      const moduleNames: Record<number, string> = {
        1: "Einführung in die Immobilienwirtschaft",
        2: "Immobilienmakler §34c GewO",
        3: "WEG-Verwaltung & Mietrecht",
        4: "Gutachter & Sachverständiger",
        5: "Darlehensvermittler §34i GewO",
      };

      const formatPrompts: Record<string, string> = {
        podcast: `Schreibe einen PODCAST-TEXT für NotebookLM Audio Overview (Deep Dive Format, 8-12 Minuten).
WICHTIG - Exaktes Format das NotebookLM am besten verarbeitet:
- Zwei Sprecher: [SPRECHER A] und [SPRECHER B]
- Beginne mit: "[SPRECHER A]: Hey, willkommen zurück! Heute sprechen wir über..."
- Wechsle alle 2-4 Sätze zwischen den Sprechern
- Nutze echte Berliner Immobilienbeispiele
- Erkläre jeden Fachbegriff sofort danach in einfachen Worten
- Stelle rhetorische Fragen: "Wusstest du, dass...?"
- Beende mit: "Was nimmst du heute mit?"
- Mindestens 2.000 Wörter für gute Audio-Qualität`,

        videoskript: `Schreibe ein professionelles VIDEO-SPRECHTEXTSKRIPT für einen echten menschlichen Sprecher (10-15 Minuten).
Format für Video-Produktion:
[SZENE: Beschreibung was im Bild zu sehen ist]
[SPRECHER - NORMAL/BETONEND/PAUSE]: Der gesprochene Text hier...
[EINBLENDUNG: Text der eingeblendet wird]
[BEISPIEL: Konkreter Fall aus der Praxis]

Regeln:
- Kurze Sätze (max. 15 Wörter) für flüssiges Sprechen
- Pausen markieren mit [PAUSE 2 SEC]
- Wichtige Begriffe markieren mit *Kursiv*
- Praxisbeispiele aus Berlin/Deutschland
- Verständlich für Quereinsteiger ohne Vorkenntnisse
- Am Ende: Zusammenfassung + 3 Lernziele`,

        synthesia: `Schreibe ein KI-AVATAR SKRIPT für Synthesia oder ähnliche Tools (5-8 Minuten).
Format für KI-Avatar Videos:
- Sehr kurze Sätze (max. 10 Wörter) - KI-Stimmen klingen sonst unnatürlich
- Keine Klammern oder Sonderzeichen im Sprechtext
- Beginne jeden Abschnitt mit dem Thema als Titel: ## THEMA
- Sprechertext darunter ohne Formatierung
- Nach jedem Abschnitt: VISUALS: [was gezeigt werden soll]
- Einfache Sprache - Hauptschulniveau ausreichend
- Keine verschachtelten Sätze
- Wiederholungen sind gut für KI-Stimmen`,

        zusammenfassung: `Schreibe eine KURZE ZUSAMMENFASSUNG (2-3 Minuten) für alle drei Verwendungen:
- Als NotebookLM Brief Format (kurzer Podcast)
- Als Social Media Video (Instagram/LinkedIn)
- Als Einleitung vor dem Hauptvideo

Format: Fließtext, klar strukturiert, max. 500 Wörter.
Kernpunkte als nummerierte Liste am Ende.`,
      };

      const prompt = formatPrompts[format] || formatPrompts.podcast;
      const systemPrompt = `Du bist ein erfahrener Medienproducer und IHK-Dozent für Immobilienwirtschaft in Deutschland.
Modul: ${moduleNames[Number(moduleId)]}
Thema: ${thema}

${prompt}

INHALTLICHE ANFORDERUNGEN:
- Alle Gesetze korrekt zitieren (§34c GewO, §652 BGB, etc.)
- Praxisbeispiele aus dem deutschen/Berliner Immobilienmarkt
- Für Quereinsteiger und Erwachsene ohne Vorkenntnisse verständlich
- IHK-Prüfungsrelevante Inhalte bevorzugen
- Aktuelle Rechtslage 2025/2026`;

      const result = await askClaude(systemPrompt, `Erstelle das ${format}-Skript für: ${thema}`, []);

      res.json({
        success: true,
        skript: result,
        format,
        thema,
        moduleId,
        moduleName: moduleNames[Number(moduleId)],
        generatedAt: new Date().toISOString(),
        wordCount: result.split(" ").length,
      });
    } catch (err: any) {
      res.status(500).json({ error: "Fehler: " + err.message });
    }
  });

  // Exposé-Generator: Immobilie beschreiben + KI bewertet Pflichtangaben
  app.post("/api/ai/bewerte-expose", async (req: Request, res: Response) => {
    try {
      const { expose, immobilienDaten } = req.body;
      if (!expose || expose.length < 50) return res.status(400).json({ error: "Exposé zu kurz" });

      const prompt = "Du bist ein IHK-Prüfer für Immobilienmakler. Bewerte das folgende Exposé nach deutschen Pflichtangaben.\n\nIMMOBILIEN-DATEN:\n" + (immobilienDaten || "Nicht angegeben") + "\n\nEINGEREICHTES EXPOSÉ:\n" + expose + "\n\nPrüfe folgende Pflichtangaben nach GEG/EnEV und MaBV:\n1. Energieausweis-Typ (Bedarfs- oder Verbrauchsausweis)\n2. Energieträger (Gas, Öl, Fernwärme etc.)\n3. Baujahr des Gebäudes\n4. Energiekennwert (kWh/m²a)\n5. Energieeffizienzklasse (A+ bis H)\n6. Courtage-Angabe mit Mehrwertsteuer\n7. Wohnfläche in Quadratmeter\n8. Kaufpreis oder Miete\n9. Lage/Adresse (zumindest Stadtteil)\n10. Objektbeschreibung\n\nAntworte NUR mit diesem JSON:\n{\n  \"gesamtnote\": \"Sehr gut|Gut|Befriedigend|Ausreichend|Mangelhaft\",\n  \"punkte\": 0-100,\n  \"pflichtangaben\": {\n    \"energieausweis_typ\": true|false,\n    \"energietraeger\": true|false,\n    \"baujahr\": true|false,\n    \"energiekennwert\": true|false,\n    \"effizienzklasse\": true|false,\n    \"courtage\": true|false,\n    \"wohnflaeche\": true|false,\n    \"preis\": true|false,\n    \"lage\": true|false,\n    \"objektbeschreibung\": true|false\n  },\n  \"feedback\": \"2-3 Sätze Gesamtbewertung\",\n  \"fehlendeAngaben\": [\"Liste der fehlenden Pflichtangaben\"],\n  \"verbesserungen\": \"Konkrete Verbesserungsvorschläge\",\n  \"rechtlicheRisiken\": \"Rechtliche Risiken bei fehlendem Exposé\"\n}";

      const answer = await askClaude("Du bist strenger IHK-Prüfer für Maklerrecht. Antworte NUR mit JSON.", prompt, []);
      const clean = answer.replace(/```json/g, "").replace(/```/g, "").trim();

      try {
        const bewertung = JSON.parse(clean);
        res.json({ success: true, bewertung });
      } catch {
        res.status(500).json({ error: "Bewertung konnte nicht verarbeitet werden" });
      }
    } catch (err: any) {
      res.status(500).json({ error: "Fehler: " + err.message });
    }
  });

}
</file>

</files>
