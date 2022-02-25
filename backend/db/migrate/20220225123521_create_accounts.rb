class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts, id: :uuid do |t|
      t.text :name
      t.text :slug
      t.text :about_en
      t.text :about_es
      t.text :about_pt
      t.text :website
      t.text :linkedin
      t.text :facebook
      t.text :twitter
      t.text :instagram
      t.string :language

      t.index :name, unique: true
      t.index :slug, unique: true

      t.timestamps
    end
  end
end
