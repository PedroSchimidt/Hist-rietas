from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as gemini

app = Flask(__name__)
CORS(app)

gemini.configure(api_key="AIzaSyBNzCsz9phyyM95hqSGX2-lWBAX56V_c7c")
model = gemini.GenerativeModel('gemini-1.5-flash')

@app.route('/historia', methods=['POST'])
def make_historia():
    try:
        dados = request.json
        personagens = dados.get('personagem')
    
        prompt = f"""
        Crie uma história com um início, meio e fim, utilizando apenas as seguintes descrições: {personagens}. 

        A história deve ser formatada em HTML com codificação UTF-8, conforme as seguintes especificações:
        - Título da história em uma tag <h1>.
        - Subtítulos em tags <h2>.
        - O texto da história deve estar em parágrafos (<p>).

        Não inclua tags HTML adicionais, aspas ou o cabeçalho HTML. 

        Caso o texto inserido contenha palavras ofensivas, palavrões, conteúdo inapropriado ou palavras +18, por favor, não aceite o conteúdo e emita um aviso em portugues ao usuário informando sobre a inadequação do texto.

        Inclua também uma moral da história no final, escrita em um parágrafo separado.

        Organize o conteúdo de forma clara e mantenha a formatação consistente ao longo da história.
        """

    
        resposta = model.generate_content(prompt)
        print(resposta)

        personagens = resposta.text.strip().split('\n')

        return jsonify({"personagens": personagens}), 200 
    except Exception as e: 
        return jsonify({"Erro": str(e)}), 300
    
if __name__ =='__main__':
    app.run(debug=True)