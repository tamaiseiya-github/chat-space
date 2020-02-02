require 'rails helper'

RSpec.describe Message, type: :model do
# RSpec.describe  で、テストのグループ化を宣言。モデル名, type: model: で、モデルに関するテストであることを付け加えている。
  describe '#create' do
  # 上記でcreateアクション時のテストであると宣言
    context 'can save' do
    # この中にメッセージを保存できる場合のテストを記述
      it 'is valid with content' do
      #メッセージがある
        expect(build(:message,image:  nil)).to be_valid
        # expect(X).to Y  で、XのときYされることを期待するという意味のコードになる
        # build(カラム名: 値)の形で引数を渡すことによって、ファクトリーで定義されたデフォルトの値を上書きする。(buildメソッド)
        # expect(build(:メッセージ,画像:ない).to 左記のときに保存された場合テストにパスするといったコードである。
      end

      it 'is valid with image' do
      #画像がある
        expect(build(:message, content:  nil)).to be_valid
       end

      it 'is valid with content and image' do
      #メッセージと画像がある
        expect(build(:message)).to be_valid
       end


    end
    

    context 'can not save' do
    # この中にメッセージを保存できない場合のテストを記述
      it 'is invalid without content and image' do
      # 画像もメッセージもない
        message = build(:message, content: nil, image: nil)
        message.valid?
    
        # 下記を表示する前にメッセージの検証を行う。
        expect(message.errors[:content]).to include("を入力してください")
        # error時の表示を設定する。
        # message.errors[:カラム名] でそのカラムが原因のエラー文が入った配列を取り出す(エラー文はrails内に自動で設定されている)
        # 上記で生成されたエラー文に"を入力されています"を含んでいる(include)場合テストにパスするといったコードである。
      end

      it 'is invalid without group_id' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it 'is invaid without user_id' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
          end
        end
      end