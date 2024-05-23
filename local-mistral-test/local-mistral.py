from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
import torch

model_id = "mistralai/Mistral-7B-Instruct-v0.2"

# Ensure quantization configuration is compatible
config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float32,
    llm_int8_enable_fp32_cpu_offload=True
)

# Initialize the model with quantization configuration
tokenizer = AutoTokenizer.from_pretrained(model_id)

try:
    model = AutoModelForCausalLM.from_pretrained(
        model_id,
        quantization_config=config,
    )
    print("Model loaded successfully")
except ImportError as e:
    print(f"ImportError: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
