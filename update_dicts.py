import json

en_file = '/Users/dylan/Desktop/yyconstruction-nextjs/src/dictionaries/en.json'
zh_file = '/Users/dylan/Desktop/yyconstruction-nextjs/src/dictionaries/zh.json'

with open(en_file, 'r', encoding='utf-8') as f:
    en_data = json.load(f)
with open(zh_file, 'r', encoding='utf-8') as f:
    zh_data = json.load(f)

# Features
en_data['whyChooseUs']['features'] = [
    {
      "id": 1,
      "title": "Integrated Service:",
      "description": "Seamless collaboration between design and construction for smoother communication."
    },
    {
      "id": 2,
      "title": "Experienced Team:",
      "description": "Professionals with deep expertise in residential and commercial renovations."
    },
    {
      "id": 3,
      "title": "Transparent Process:",
      "description": "Detailed budgeting and timelines, with no hidden fees."
    },
    {
      "id": 4,
      "title": "Client-Centered:",
      "description": "Bilingual service (English & Chinese) with fast response and clear communication."
    }
]

zh_data['whyChooseUs']['features'] = [
    {
      "id": 1,
      "title": "一体化服务：",
      "description": "从设计到施工无缝衔接，效率更高，沟通更顺畅。"
    },
    {
      "id": 2,
      "title": "专业团队：",
      "description": "设计师、工长、施工人员均具备丰富行业经验。"
    },
    {
      "id": 3,
      "title": "透明管理：",
      "description": "全过程公开报价与时间表，杜绝隐性收费。"
    },
    {
      "id": 4,
      "title": "客户为本：",
      "description": "支持中英双语服务，快速响应客户需求与反馈。"
    }
]

# Services
en_data['services']['items'] = [
  {
    "title": "Residential Design & Renovation",
    "description": "Custom design and renovation for houses, apartments, and townhomes. Kitchen and bathroom Design & Renovation. Finishes & Furniture selection and Interior design consultation.",
    "link": "/residential-design-renovation"
  },
  {
    "title": "Commercial Design & Renovation",
    "description": "Full-service design / renovation & management for restaurants, offices, and retail spaces. Brand visual image w / Interior design, Space planning. Lighting, plumbing, HVAC, fire safety.",
    "link": "/commercial-design-renovation"
  },
  {
    "title": "Design Drawings & City Approvals",
    "description": "Full sets of architectural and interior construction drawings. Assistance with permit applications, change requests, and city approvals.",
    "link": "/design-drawings-city-approvals"
  },
  {
    "title": "Project Management",
    "description": "Project scheduling and progress monitoring. Budget planning and material procurement. On-site coordination and quality control throughout construction.",
    "link": "/project-management"
  },
  {
    "title": "Tear-down & Rebuild",
    "description": "Demolition of outdated properties and full-scale rebuild. Architectural planning, permitting, and structural optimization. Ground-up construction tailored for personal or investment needs.",
    "link": "/tear-down-rebuild"
  }
]

zh_data['services']['items'] = [
  {
    "title": "住宅设计与改造",
    "description": "独立屋、公寓、联排别墅的定制设计与施工 厨卫升级、结构改造、空间功能优化 材料甄选与风格搭配建议",
    "link": "/residential-design-renovation"
  },
  {
    "title": "商业空间建设",
    "description": "餐厅、办公室、零售门店等空间的设计与翻新 品牌形象导入、动线规划、客户体验优化 各类系统集成（灯光、管道、消防等）。",
    "link": "/commercial-design-renovation"
  },
  {
    "title": "设计图纸与政府报批",
    "description": "建筑与室内施工图绘制 协助办理建筑许可、变更申请及政府审批流程。",
    "link": "/design-drawings-city-approvals"
  },
  {
    "title": "项目全流程管理",
    "description": "工期计划与进度控制 材料采购与成本预算管理 现场施工协调与质量监管。",
    "link": "/project-management"
  },
  {
    "title": "推倒重建（Tear-down & Rebuild）",
    "description": "旧屋拆除及新房整体规划设计 建筑许可申请、结构方案优化 从地基施工到整体完工的一站式执行 适用于老龄住宅改造、重建投资项目或自住升级。",
    "link": "/tear-down-rebuild"
  }
]

# Steps
en_data['howWeWork']['steps'] = [
  {
    "id": "01",
    "title": "initial consultation",
    "description": "We start with a one-on meeting to understand your vision preferences and requirement."
  },
  {
    "id": "02",
    "title": "design planning",
    "description": "This involves selecting materials, and layouts, furnishings, as well as creating 3D renderings."
  },
  {
    "id": "03",
    "title": "project execution",
    "description": "With the design plans in this place, we manage and coordinate all aspects of the projects."
  },
  {
    "id": "04",
    "title": "final review",
    "description": "After completing project we conduct a thorough walkthrough with you to review the space."
  }
]

zh_data['howWeWork']['steps'] = [
  {
    "id": "01",
    "title": "深度需求洞察",
    "description": "您的理想空间始于一次专业对话，精准捕捉您的理想空间蓝图"
  },
  {
    "id": "02",
    "title": "设计规划",
    "description": "科学架构理想空间的实现路径,精选材质,科学布局,沉浸预演 - 全维度设计呈现"
  },
  {
    "id": "03",
    "title": "高标准施工落地",
    "description": "将图纸精准转化为现实,以设计蓝图为核心,全方位项目统筹管理"
  },
  {
    "id": "04",
    "title": "终审验收",
    "description": "竣工交付，与您共鉴理想空间的完美呈现"
  }
]

with open(en_file, 'w', encoding='utf-8') as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)
with open(zh_file, 'w', encoding='utf-8') as f:
    json.dump(zh_data, f, ensure_ascii=False, indent=2)
