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
        securitySchemes: {},
        schemas: {
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
              }
            },
            required: %w[id type attributes]
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
                  investor: {
                    type: :object,
                    properties: {
                      data: {
                        type: :object,
                        properties: {
                          id: {type: :string},
                          type: {type: :string}
                        },
                        required: %w[id type]
                      },
                      required: %w[data]
                    }
                  }
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
                  description: {type: :string},
                  ticket_size: {type: :string},
                  categories: {type: :array, items: {type: :string}},
                  instrument_types: {type: :array, items: {type: :string}},
                  sdgs: {type: :array, items: {type: :integer}},
                  problem: {type: :string},
                  solution: {type: :string},
                  business_model: {type: :string},
                  other_information: {type: :string},
                  impact_description: {type: :string},
                  sustainability: {type: :string},
                  roi: {type: :string},
                  language: {type: :string},
                  income_in_last_3_years: {type: :string},
                  number_of_employees: {type: :integer},
                  number_of_employees_women: {type: :integer},
                  number_of_employees_young: {type: :integer},
                  number_of_employees_indigenous: {type: :integer},
                  number_of_employees_migrants: {type: :integer}
                }
              },
              relationships: {
                type: :object,
                properties: {
                  project_developer: {
                    type: :object,
                    properties: {
                      data: {
                        type: :object,
                        properties: {
                          id: {type: :string},
                          type: {type: :string}
                        },
                        required: %w[id type]
                      },
                      required: %w[data]
                    }
                  }
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
                  language: {type: :string}
                }
              }
            },
            required: %w[id type attributes]
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
