## membersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|text|null: false, unique: true|

### Association
- has_many :groups
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|member_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :member
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|message|text||
|member_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :member
- belongs_to :group
