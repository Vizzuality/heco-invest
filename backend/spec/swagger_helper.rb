# frozen_string_literal: true

require "rails_helper"

RSpec.configure do |config|
  config.swagger_root = Rails.root.join("swagger").to_s

  config.after :each, generate_swagger_example: true do |example|
    example.metadata[:response][:content] = {
      "application/json" => {example: JSON.parse(response.body, symbolize_names: true)}
    }
  end

  config.swagger_docs = {
    "v1/swagger.yaml" => {
      openapi: "3.0.1",
      info: {
        title: "API V1",
        version: "v1"
      },
      paths: {},
      components: {
        securitySchemes: {
          csrf: {
            type: :apiKey,
            name: "X-CSRF-TOKEN",
            in: :header
          },
          cookie_auth: {
            type: :apiKey,
            name: "_backend_session",
            in: :cookie
          }
        },
        schemas: {
          user: {
            type: :object,
            properties: {
              id: {type: :string},
              type: {type: :string},
              attributes: {
                first_name: {type: :string},
                last_name: {type: :string},
                email: {type: :string}
              }
            }
          },
          investor: {
            type: :object,
            properties: {
              id: {type: :string},
              type: {type: :string},
              attributes: {
                type: :object,
                properties: {
                  name: {type: :string},
                  slug: {type: :string},
                  picture_url: {type: :string},
                  about: {type: :string, nullable: true},
                  website: {type: :string, nullable: true},
                  instagram: {type: :string, nullable: true},
                  facebook: {type: :string, nullable: true},
                  linkedin: {type: :string, nullable: true},
                  twitter: {type: :string, nullable: true},
                  how_do_you_work: {type: :string},
                  what_makes_the_difference: {type: :string, nullable: true},
                  other_information: {type: :string},
                  investor_type: {type: :string},
                  categories: {type: :array, items: {type: :string}},
                  ticket_sizes: {type: :array, items: {type: :string}},
                  instrument_types: {type: :array, items: {type: :string}},
                  impacts: {type: :array, items: {type: :string}},
                  sdgs: {type: :array, items: {type: :integer}},
                  previously_invested: {type: :boolean},
                  previously_invested_description: {type: :string, nullable: true},
                  language: {type: :string}
                }
              },
              relationships: {
                type: :object,
                properties: {
                  owner: {"$ref" => "#/components/schemas/response_relation"}
                }
              }
            },
            required: %w[id type attributes relationships]
          },
          location: {
            type: :object,
            properties: {
              id: {type: :string},
              type: {type: :string},
              attributes: {
                type: :object,
                properties: {
                  name: {type: :string},
                  location_type: {type: :string, enum: LocationType::TYPES}
                }
              },
              relationships: {
                type: :object,
                properties: {
                  parent: {
                    type: :object,
                    properties: {
                      data: {
                        type: :object,
                        nullable: true,
                        properties: {
                          id: {type: :string},
                          type: {type: :string}
                        },
                        required: %w[id type]
                      },
                      required: %w[data]
                    }
                  },
                  regions: {"$ref" => "#/components/schemas/response_relations"}
                }
              }
            },
            required: %w[id type attributes relationships]
          },
          open_call: {
            type: :object,
            properties: {
              id: {type: :string},
              type: {type: :string},
              attributes: {
                type: :object,
                properties: {
                  name: {type: :string},
                  slug: {type: :string},
                  description: {type: :string},
                  ticket_size: {type: :string},
                  instrument_type: {type: :string},
                  sdgs: {type: :array, items: {type: :integer}},
                  money_distribution: {type: :string},
                  impact_description: {type: :string},
                  closing_at: {type: :string},
                  language: {type: :string}
                }
              },
              relationships: {
                type: :object,
                properties: {
                  investor: {"$ref" => "#/components/schemas/response_relation"}
                }
              }
            },
            required: %w[id type attributes relationships]
          },
          project: {
            type: :object,
            properties: {
              id: {type: :string},
              type: {type: :string},
              attributes: {
                type: :object,
                properties: {
                  name: {type: :string},
                  slug: {type: :string},
                  country_id: {type: :string},
                  municipality_id: {type: :string},
                  department_id: {type: :string},
                  development_stage: {type: :string, enum: ProjectDevelopmentStage::TYPES},
                  estimated_duration_in_months: {type: :integer},
                  involved_project_developer_not_listed: {type: :boolean},
                  problem: {type: :string},
                  solution: {type: :string},
                  expected_impact: {type: :string},
                  looking_for_funding: {type: :boolean},
                  funding_plan: {type: :string, nullable: true},
                  received_funding: {type: :boolean},
                  received_funding_amount_usd: {type: :string, nullable: true},
                  received_funding_investor: {type: :string, nullable: true},
                  replicability: {type: :string},
                  sustainability: {type: :string},
                  progress_impact_tracking: {type: :string},
                  description: {type: :string},
                  relevant_links: {type: :string, nullable: true},
                  ticket_size: {type: :string, enum: TicketSize::TYPES, nullable: true},
                  category: {type: :string},
                  target_groups: {type: :array, items: {type: :string}},
                  impact_areas: {type: :array, items: {type: :string}},
                  instrument_types: {type: :array, items: {type: :string}},
                  sdgs: {type: :array, items: {type: :integer}},
                  language: {type: :string},
                  favourite: {type: :boolean}
                }
              },
              relationships: {
                type: :object,
                properties: {
                  project_developer: {"$ref" => "#/components/schemas/response_relation"},
                  involved_project_developer: {"$ref" => "#/components/schemas/response_relation"},
                  project_images: {"$ref" => "#/components/schemas/response_relations"}
                }
              }
            },
            required: %w[id type attributes relationships]
          },
          project_developer: {
            type: :object,
            properties: {
              id: {type: :string},
              type: {type: :string},
              attributes: {
                type: :object,
                properties: {
                  name: {type: :string},
                  slug: {type: :string},
                  picture_url: {type: :string},
                  about: {type: :string, nullable: true},
                  website: {type: :string, nullable: true},
                  instagram: {type: :string, nullable: true},
                  facebook: {type: :string, nullable: true},
                  linkedin: {type: :string, nullable: true},
                  twitter: {type: :string, nullable: true},
                  mission: {type: :string, nullable: true},
                  project_developer_type: {type: :string, nullable: true},
                  categories: {type: :array, items: {type: :string}},
                  impacts: {type: :array, items: {type: :string}},
                  mosaics: {type: :array, items: {type: :string}},
                  language: {type: :string},
                  entity_legal_registration_number: {type: :string},
                  favourite: {type: :boolean}
                }
              },
              relationships: {
                type: :object,
                properties: {
                  projects: {"$ref" => "#/components/schemas/response_relations"},
                  involved_projects: {"$ref" => "#/components/schemas/response_relations"},
                  owner: {"$ref" => "#/components/schemas/response_relation"}
                }
              }
            },
            required: %w[id type attributes relationships]
          },
          enum: {
            type: :object,
            properties: {
              id: {type: :string},
              type: {type: :string},
              attributes: {
                type: :object,
                properties: {
                  name: {type: :string},
                  description: {type: :string}
                },
                required: %w[name]
              }
            },
            required: %w[id type attributes]
          },
          direct_upload: {
            type: :object,
            properties: {
              id: {type: :string},
              key: {type: :string},
              filename: {type: :string},
              content_type: {type: :string},
              metadata: {type: :object},
              byte_size: {type: :integer},
              checksum: {type: :string},
              created_at: {type: :string},
              service_name: {type: :string},
              signed_id: {type: :string},
              attachable_sgid: {type: :string},
              direct_upload: {
                type: :object,
                properties: {
                  url: {type: :string},
                  headers: {
                    type: :object,
                    properties: {
                      'Content-Type': {type: :string}
                    }
                  }
                }
              }
            },
            required: %w[id key filename content_type metadata byte_size checksum created_at service_name signed_id attachable_sgid direct_upload]
          },
          pagination_meta: {
            type: :object,
            properties: {
              page: {type: :integer},
              per_page: {type: :integer},
              from: {type: :integer},
              to: {type: :integer},
              total: {type: :integer},
              pages: {type: :integer}
            },
            required: %w[page per_page from to total pages]
          },
          pagination_links: {
            type: :object,
            properties: {
              first: {type: :string},
              self: {type: :string},
              last: {type: :string}
            },
            required: %w[first self last]
          },
          response_relation: {
            type: :object,
            properties: {
              data: {
                type: :object,
                properties: {
                  id: {type: :string},
                  type: {type: :string}
                },
                required: %w[id type]
              }
            },
            required: %w[data]
          },
          response_relations: {
            type: :object,
            properties: {
              data: {
                type: :array,
                items: {
                  object: :object,
                  properties: {
                    id: {type: :string},
                    type: {type: :string}
                  },
                  required: %w[id type]
                }
              }
            },
            required: %w[data]
          },
          errors: {
            type: :object,
            properties: {
              errors: {
                type: :array,
                items: {
                  type: :object,
                  properties: {
                    title: {type: :string}
                  },
                  required: %w[title]
                }
              }
            },
            required: %w[errors]
          }
        }
      },
      servers: [
        {
          url: "/backend"
        },
        {
          url: "{scheme}://{host}",
          variables: {
            scheme: {
              default: "http"
            },
            host: {
              default: "localhost:4000"
            }
          }
        }
      ]
    }
  }

  config.swagger_format = :yaml
end
