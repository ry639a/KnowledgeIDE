## Knowledge IDE
### Editor and workspace for scientific tasks.

### Full stack app:
1. Editor with integrated capabilities for text, math, and markdown.
2. AI assistant for research paper summarization and insights extraction.
3. Technologies used: 
   1. **UI**: HTML, Javascript, TipTap, React components.  
   2. **API**: Python, FastAPI, 
   3. **ML Services**: Summarization and Insights extraction: langgraph, langchain, Agents, Tooling

### Interface:
  <img width="3210" height="1848" alt="image" src="https://github.com/user-attachments/assets/18126cf0-4fad-4870-8bfa-f10f8e6035d4" />
  
### Workspace:
  <img width="3210" height="1826" alt="image" src="https://github.com/user-attachments/assets/3102d6f5-f4ff-4fe3-8552-8f1a15e555df" />
Workspace consists of editor and chat assistant.
Editor support various text formats, and mathematical equations as well as code to enable users to quickly capture notes for any brainstorming sessions.

### AI assistant features:
#### Paper Summarization:
  <img width="3188" height="2050" alt="image" src="https://github.com/user-attachments/assets/ffff0381-c78a-45be-9d23-50fb7dc34120" />

<img width="1564" height="1424" alt="image" src="https://github.com/user-attachments/assets/46588ea7-40ad-4ae8-8c81-9887b134bf63" />

<img width="3220" height="1846" alt="image" src="https://github.com/user-attachments/assets/df1ce280-7582-415c-bf5d-e86dd7f33565" />


Summary is in a structured format and contains below key sections:

1. Title
2. Authors
3. Idea
4. Setup
5. Experiments
6. Results
7. Further Ideas to explore

Sample summary for the infamous "Attention is all you need" paper:

    Title:
    Attention Is All You Need
    
    Authors:
    Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin (NeurIPS 2017)
    
    Idea:
    Replace recurrence and convolution with self-attention to model sequences. The Transformer architecture uses multi-head self-attention, 
    position-wise feed-forward networks, residual connections, and sinusoidal positional encodings to enable highly parallel training, 
    improved path lengths for long-range dependencies, and strong performance on sequence transduction tasks.
    
    Setup:
    - Task: Neural machine translation (NMT)
    - Datasets: WMT’14 English→German and English→French
    - Models:
      - Transformer Base: 6-layer encoder and 6-layer decoder; d_model=512; d_ff=2048; 8 attention heads; dropout≈0.1
      - Transformer Big: d_model=1024; d_ff=4096; 16 heads; higher dropout (≈0.3)
    - Key components:
      - Scaled dot-product attention; multi-head attention
      - Sinusoidal positional encodings
      - Masked self-attention in decoder for autoregressive generation
      - Residual connections + layer normalization
    - Training:
      - Adam optimizer with a custom learning-rate schedule (warmup then inverse-sqrt decay)
      - Label smoothing (ε≈0.1)
      - Parallel training on 8 GPUs; highly parallelizable due to no recurrence.


#### Insights extraction:

<img width="3142" height="1804" alt="image" src="https://github.com/user-attachments/assets/3faee974-c5f0-40ae-8465-b7fc6cfa2f01" />




  
    
