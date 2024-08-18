{
  "_$ver": 1,
  "_$id": "lx8mwule",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$comp": [
    {
      "_$type": "cda64fda-dce1-4dd1-99a0-3c0c48dbc52e",
      "scriptPath": "../src/GameRoot.ts"
    },
    {
      "_$type": "e880bae9-e0d9-468e-b2bf-3612729a7c76",
      "scriptPath": "../src/ColumnSpawn.ts",
      "ColumnPrefab": {
        "_$uuid": "2f4fc46f-0b74-4fab-9e1f-972b03120485",
        "_$type": "Prefab"
      }
    }
  ],
  "_$child": [
    {
      "_$id": "pkm9o51q",
      "_$type": "Sprite",
      "name": "bg1",
      "width": 2048,
      "height": 1024,
      "texture": {
        "_$uuid": "975cef66-7304-49d5-8a7d-5bb33d39d721",
        "_$type": "Texture"
      },
      "_$comp": [
        {
          "_$type": "RigidBody",
          "type": "kinematic"
        },
        {
          "_$type": "96f488b6-a38f-4c07-8c10-0e9e67b5c0c3",
          "scriptPath": "../src/AutoMove.ts"
        },
        {
          "_$type": "db946373-234e-4561-9c85-fd74c07e1dd3",
          "scriptPath": "../src/RepeatingBg.ts"
        }
      ]
    },
    {
      "_$id": "c40gvev7",
      "_$type": "Sprite",
      "name": "bg2",
      "x": 2048,
      "width": 2048,
      "height": 1024,
      "texture": {
        "_$uuid": "975cef66-7304-49d5-8a7d-5bb33d39d721",
        "_$type": "Texture"
      },
      "_$comp": [
        {
          "_$type": "RigidBody",
          "type": "kinematic"
        },
        {
          "_$type": "96f488b6-a38f-4c07-8c10-0e9e67b5c0c3",
          "scriptPath": "../src/AutoMove.ts"
        },
        {
          "_$type": "db946373-234e-4561-9c85-fd74c07e1dd3",
          "scriptPath": "../src/RepeatingBg.ts"
        }
      ]
    },
    {
      "_$id": "at5gy220",
      "_$type": "Sprite",
      "name": "ground1",
      "y": 568,
      "width": 2048,
      "height": 512,
      "texture": {
        "_$uuid": "471fb503-345d-4745-9a60-7b6f3f892a3f",
        "_$type": "Texture"
      },
      "_$comp": [
        {
          "_$type": "RigidBody",
          "type": "kinematic"
        },
        {
          "_$type": "96f488b6-a38f-4c07-8c10-0e9e67b5c0c3",
          "scriptPath": "../src/AutoMove.ts"
        },
        {
          "_$type": "db946373-234e-4561-9c85-fd74c07e1dd3",
          "scriptPath": "../src/RepeatingBg.ts"
        },
        {
          "_$type": "BoxCollider",
          "y": 270,
          "width": 2048,
          "height": 242
        }
      ]
    },
    {
      "_$id": "e943tql3",
      "_$type": "Sprite",
      "name": "ground2",
      "x": 2048,
      "y": 568,
      "width": 2048,
      "height": 512,
      "texture": {
        "_$uuid": "471fb503-345d-4745-9a60-7b6f3f892a3f",
        "_$type": "Texture"
      },
      "_$comp": [
        {
          "_$type": "RigidBody",
          "type": "kinematic"
        },
        {
          "_$type": "96f488b6-a38f-4c07-8c10-0e9e67b5c0c3",
          "scriptPath": "../src/AutoMove.ts"
        },
        {
          "_$type": "db946373-234e-4561-9c85-fd74c07e1dd3",
          "scriptPath": "../src/RepeatingBg.ts"
        },
        {
          "_$type": "BoxCollider",
          "y": 270,
          "width": 2048,
          "height": 242
        }
      ]
    },
    {
      "_$id": "y0yfzbbt",
      "_$type": "Sprite",
      "name": "bird",
      "x": 130,
      "y": 372,
      "width": 128,
      "height": 128,
      "texture": {
        "_$uuid": "898ba90a-cfb2-41f2-8cf5-48f7a5edb1ac",
        "_$type": "Texture"
      },
      "_$comp": [
        {
          "_$type": "RigidBody",
          "gravityScale": 2
        },
        {
          "_$type": "BoxCollider",
          "x": 25,
          "y": 42,
          "width": 63,
          "height": 51
        },
        {
          "_$type": "93d0b492-f4e2-49ad-8a85-3ecdf5ce9ba7",
          "scriptPath": "../src/BirdCtrl.ts"
        }
      ]
    },
    {
      "_$id": "de0g6pqt",
      "_$type": "Sprite",
      "name": "TopCollider",
      "y": -1,
      "width": 2048,
      "height": 1,
      "_$comp": [
        {
          "_$type": "RigidBody",
          "type": "static"
        },
        {
          "_$type": "BoxCollider",
          "width": 2048,
          "height": 1
        }
      ]
    },
    {
      "_$id": "1h6mx2hk",
      "_$prefab": "2f4fc46f-0b74-4fab-9e1f-972b03120485",
      "name": "column",
      "active": true,
      "x": 1474,
      "y": 399,
      "visible": true
    },
    {
      "_$id": "mtix6ou0",
      "_$type": "Sprite",
      "name": "ColumnParent",
      "width": 1920,
      "height": 1080
    }
  ]
}